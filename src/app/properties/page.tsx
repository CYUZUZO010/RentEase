import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters } from "@/components/property-filters"
import { getCurrentUser } from "@/lib/auth"
import { sql, type PropertyWithOwner } from "@/lib/db"
import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"

interface SearchParams {
  search?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
  bathrooms?: string
}


export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const user = await getCurrentUser()
  const params = await searchParams

  let query = `
    SELECT 
      p.*,
      json_build_object('name', u.name, 'email', u.email, 'id', u.id) as owner
    FROM properties p
    JOIN users u ON p."ownerId" = u.id
    WHERE p.available = true
  `
  const queryParams: (string | number)[] = []
  let paramIndex = 1

  if (params.search) {
    query += ` AND (
      p.title ILIKE $${paramIndex} OR 
      p.description ILIKE $${paramIndex} OR 
      p.location ILIKE $${paramIndex}
    )`
    queryParams.push(`%${params.search}%`)
    paramIndex++
  }

  if (params.minPrice) {
    query += ` AND p.price >= $${paramIndex}`
    queryParams.push(Number.parseFloat(params.minPrice))
    paramIndex++
  }

  if (params.maxPrice) {
    query += ` AND p.price <= $${paramIndex}`
    queryParams.push(Number.parseFloat(params.maxPrice))
    paramIndex++
  }

  if (params.bedrooms) {
    query += ` AND p.bedrooms >= $${paramIndex}`
    queryParams.push(Number.parseInt(params.bedrooms))
    paramIndex++
  }

  if (params.bathrooms) {
    query += ` AND p.bathrooms >= $${paramIndex}`
    queryParams.push(Number.parseInt(params.bathrooms))
    paramIndex++
  }

  query += ` ORDER BY p."createdAt" DESC`

  const properties = (await sql.unsafe(query, queryParams)) as unknown as PropertyWithOwner[]

  return (
    <div className="min-h-screen">
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-b from-muted/30 to-background py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="border-3 w-25 h-12 border-border rounded-md cursor-pointer ">
           <Link href="/" className="cursor-pointer">
             <BackButton />
           </Link>
            
          </div>
            <div className="max-w-3xl pt-9">
              <h1 className="text-4xl sm:text-5xl font-bold">
                Discover Your Perfect Home
              </h1>
              <p className="text-lg text-muted-foreground ml-10">
                Browse through our curated collection of premium rental properties
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <PropertyFilters />
              </div>

              {/* Property Grid */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {properties.length} {properties.length === 1 ? "property" : "properties"} found
                  </p>
                </div>

                {properties.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-xl text-muted-foreground mb-4">No properties found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters or search criteria</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
