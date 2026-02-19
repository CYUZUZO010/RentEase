
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/dbPool";

export type User = {
  id: string;
  email: string;
  name: string;
  role: "OWNER" | "USER" | "ADMIN";
};

// ------------------- Password Helpers -------------------
export async function hashPassword(password: string): Promise<string> {
  return `hashed_${password}`;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return `hashed_${password}` === hashedPassword;
}

// ------------------- Session Helpers -------------------
export async function createSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value;
}

// ------------------- Current User -------------------
export async function getCurrentUser(): Promise<User | null> {
  const sessionId = await getSession();
  if (!sessionId) return null;

  const client = await pool.connect();
  try {
    const res = await client.query<User>(
      "SELECT id, email, name, role FROM users WHERE id = $1 LIMIT 1",
      [sessionId]
    );
    return res.rows[0] ?? null;
  } finally {
    client.release();
  }
}

// ------------------- Auth Guards -------------------
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user!;
}

export async function requireOwner(): Promise<User> {
  const user = await requireAuth();
  if (user.role !== "OWNER") redirect("/properties");
  return user;
}

// ------------------- Logout -------------------
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
