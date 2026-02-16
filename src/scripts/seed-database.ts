import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("[v0] Starting database seed...")

  // Create sample owner user
  const owner = await prisma.user.upsert({
    where: { email: "owner@rentease.com" },
    update: {},
    create: {
      email: "owner@rentease.com",
      name: "John Owner",
      role: "OWNER",
      password: "hashed_password_here",
    },
  })

  
  console.log("[v0] Created owner user:", owner.email)

  // Create sample renter user
  const renter = await prisma.user.upsert({
    where: { email: "renter@rentease.com" },
    update: {},
    create: {
      email: "renter@rentease.com",
      name: "Jane Renter",
      role: "RENTER",
      password: "hashed_password_here",
    },
  })

  console.log("[v0] Created renter user:", renter.email)

  // Create sample properties
  const properties = [
    {
      title: "Modern Downtown Apartment",
      description:
        "Luxurious 2-bedroom apartment in the heart of downtown with stunning city views and modern amenities.",
      price: 2500,
      location: "Downtown, City Center",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      imageUrl: "/modern-downtown-apartment-exterior.jpg",
      images: ["/modern-apartment-living-room.png", "/modern-apartment-kitchen.png", "/modern-apartment-bedroom.png"],
      available: true,
      ownerId: owner.id,
    },
    {
      title: "Cozy Suburban House",
      description:
        "Beautiful 3-bedroom house with a large backyard, perfect for families. Quiet neighborhood with great schools nearby.",
      price: 3200,
      location: "Suburban Area, Green Valley",
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      imageUrl: "/suburban-house-exterior-with-garden.jpg",
      images: ["/suburban-living-room.png", "/suburban-kitchen.png", "/suburban-backyard.png"],
      available: true,
      ownerId: owner.id,
    },
    {
      title: "Luxury Penthouse Suite",
      description: "Exclusive penthouse with panoramic views, private terrace, and premium finishes throughout.",
      price: 5500,
      location: "Uptown, Skyline District",
      bedrooms: 4,
      bathrooms: 3,
      area: 3000,
      imageUrl: "/luxury-penthouse-exterior-view.jpg",
      images: ["/luxury-penthouse-living-room.png", "/luxury-penthouse-terrace.png", "/luxury-penthouse-master-bedroom.jpg"],
      available: true,
      ownerId: owner.id,
    },
  ]

  for (const property of properties) {
    const created = await prisma.property.create({
      data: property,
    })
    console.log("[v0] Created property:", created.title)
  }

  console.log("[v0] Database seed completed successfully!")
}

main()
  .catch((e) => {
    console.error("[v0] Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
