"use server";

import { sql, type Property } from "@/lib/db";
import { requireOwner } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";


export async function createProperty(formData: FormData) {
  const user = await requireOwner();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const location = formData.get("location") as string;
  const bedrooms = formData.get("bedrooms") as string;
  const bathrooms = formData.get("bathrooms") as string;
  const area = formData.get("area") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (
    !title ||
    !description ||
    !price ||
    !location ||
    !bedrooms ||
    !bathrooms ||
    !area ||
    !imageUrl
  ) {
    return { error: "All fields are required" };
    
  }

  const id = randomUUID();

  await sql`
    INSERT INTO properties (
      id, title, description, price, location,
      bedrooms, bathrooms, area, "imageUrl", images,
      available, "createdAt", "updatedAt", "ownerId"
    )
    VALUES (
      ${id}, ${title}, ${description}, ${Number.parseFloat(price)}, ${location},
      ${Number.parseInt(bedrooms)}, ${Number.parseInt(
    bathrooms
  )}, ${Number.parseFloat(area)}, ${imageUrl},
      ARRAY[]::text[], true, NOW(), NOW(), ${user.id}
    )
  `;

  revalidatePath("/dashboard");
  redirect("/dashboard");
}


// UPDATE PROPERTY

export async function updateProperty(id: string, formData: FormData) {
  const user = await requireOwner();

  const properties = (await sql`
    SELECT id, "ownerId" FROM properties WHERE id = ${id} LIMIT 1
  `) as Pick<Property, "id" | "ownerId">[];

  if (properties.length === 0 || properties[0].ownerId !== user.id) {
    return { error: "Property not found or unauthorized" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const location = formData.get("location") as string;
  const bedrooms = formData.get("bedrooms") as string;
  const bathrooms = formData.get("bathrooms") as string;
  const area = formData.get("area") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const available = formData.get("available") === "true";

  await sql`
    UPDATE properties
    SET 
      title = ${title},
      description = ${description},
      price = ${Number.parseFloat(price)},
      location = ${location},
      bedrooms = ${Number.parseInt(bedrooms)},
      bathrooms = ${Number.parseInt(bathrooms)},
      area = ${Number.parseFloat(area)},
      "imageUrl" = ${imageUrl},
      available = ${available},
      "updatedAt" = NOW()
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
  revalidatePath(`/properties/${id}`);
  redirect("/dashboard");
}


// DELETE PROPERTY

export async function deleteProperty(id: string) {
  const user = await requireOwner();

  const properties = (await sql`
    SELECT id, "ownerId" FROM properties WHERE id = ${id} LIMIT 1
  `) as Pick<Property, "id" | "ownerId">[];

  if (properties.length === 0 || properties[0].ownerId !== user.id) {
    return { error: "Property not found or unauthorized" };
  }

  await sql`
    DELETE FROM properties WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
  return { success: true };
}

// TOGGLE PROPERTY AVAILABILITY

export async function togglePropertyAvailability(id: string) {
  const user = await requireOwner();

  const properties = (await sql`
    SELECT id, "ownerId", available FROM properties WHERE id = ${id} LIMIT 1
  `) as Pick<Property, "id" | "ownerId" | "available">[];

  if (properties.length === 0 || properties[0].ownerId !== user.id) {
    return { error: "Property not found or unauthorized" };
  }

  await sql`
    UPDATE properties
    SET available = ${!properties[0].available}, "updatedAt" = NOW()
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard");
  revalidatePath(`/properties/${id}`);
  return { success: true };
}
