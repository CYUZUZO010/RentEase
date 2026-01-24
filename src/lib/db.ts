import postgres from "postgres"

const DB_URL = process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/house_rental"
//the real url of the database

export const sql = postgres(DB_URL)

declare global {
  var sql : ReturnType<typeof postgres> | undefined;
}

export const Sql = 
   global.sql || 
   postgres(DB_URL , {
    ssl: process.env.NODE_ENV !== "production" ? "require" : false,
   })

   if (process.env.NODE_ENV !== "production") global.sql = sql;

export type User = {
  id: string
  email: string
  name: string | null
  role: "RENTER" | "OWNER"
  password: string
  createdAt: Date
  updatedAt: Date
}

export type Property = {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  imageUrl: string
  images: string[]
  available: boolean
  createdAt: Date
  updatedAt: Date
  ownerId: string
}

export type PropertyWithOwner = Property & {
  owner: {
    id: string
    name: string | null
    email: string
  }
}
