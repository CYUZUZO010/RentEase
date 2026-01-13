"use server"

import { sql, type User } from "@/lib/db"
import { hashPassword, verifyPassword, createSession, logout as logoutSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { randomUUID } from "crypto"
import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

export async function register(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const role = formData.get("role") as "RENTER" | "OWNER"

  // Validate input
  if (!email || !password || !name || !role) {
    redirect("/register?error=All%20fields%20are%20required")
  }

  if (password.length < 6) {
    redirect("/register?error=Password%20must%20be%20at%20least%206%20characters")
  }

  const existingUsers = (await sql`
    SELECT id FROM users WHERE email = ${email} LIMIT 1
  `) as User[]

  if (existingUsers.length > 0) {
    redirect("/register?error=User%20already%20exists")
  }

  const hashedPassword = await hashPassword(password)
  const id = randomUUID()
  // const users = (await sql`
  //   INSERT INTO users (id, email, password, name, role)
  //   VALUES (${id}, ${email}, ${hashedPassword}, ${name}, ${role})
  //   RETURNING id
  // `) as User[]

  const user = await prisma.user.create({
    data: {
      id,
      email,
      password: hashedPassword,
      name,
      role,
    },
  })


  // Create session
  await createSession(user.id)

  // Redirect based on role
  if (role === "OWNER") {
    redirect("/dashboard")
  } else {
    redirect("/properties")
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validate input
  if (!email || !password) {
    redirect("/login?error=Email%20and%20password%20are%20required")
  }

  const users = (await sql`
    SELECT id, email, password, role FROM users WHERE email = ${email} LIMIT 1
  `) as User[]

  if (users.length === 0) {
    redirect("/login?error=Invalid%20email%20or%20password")
  }

  const user = users[0]

  // Verify password
  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    redirect("/login?error=Invalid%20email%20or%20password")
  }

  // Create session
  await createSession(user.id)

  // Redirect based on role
  if (user.role === "OWNER") {
    redirect("/dashboard")
  } else {
    redirect("/properties")
  }
}

export async function logout() {
  await logoutSession()
  revalidatePath("/")
  redirect("/")
}
