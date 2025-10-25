import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/auth"
import { sql, type PropertyWithOwner } from "@/lib/db"
import { notFound } from "next/navigation"
import { Bed, Bath, Maximize, MapPin, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const user = await getCurrentUser()
  const { id } = await params

  const properties = (await sql`
    SELECT 
      p.*,
      json_build_object('id', u.id, 'name', u.name, 'email', u.email) as owner
    FROM properties p
    JOIN users u ON p."ownerId" = u.id
    WHERE p.id = ${id}
    LIMIT 1
  `) as PropertyWithOwner[]

  if (properties.length === 0) {
    notFound()
  }

  const property = properties[0]

  return (
    <div className="min-h-screen">
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/properties" className="border-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Properties
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Main Image */}
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={property.imageUrl || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                {property.available && (
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      Available Now
                    </span>
                  </div>
                )}
              </div>

              {/* Property Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-4">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-6 py-6 border-y border-border">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bed className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Bedrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bath className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">Bathrooms</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Maximize className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{property.area}</div>
                      <div className="text-sm text-muted-foreground">sq ft</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">About This Property</h2>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </div>

                {/* Additional Images */}
                {property.images && property.images.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {property.images.map((image, index) => (
                        <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Price Card */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">${property.price.toLocaleString()}</div>
                    <div className="text-muted-foreground">per month</div>
                  </div>

                  <Button className="w-full border-3 cursor-pointer" size="lg">
                    Contact Owner
                  </Button>
                </div>

                {/* Owner Info */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                  <h3 className="font-semibold text-lg cursor-pointer">Property Owner</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border-3 cursor-pointer">
                        <span className="text-lg font-semibold text-primary">{property.owner.name?.[0] || "O"}</span>
                      </div>
                      <div>
                        <div className="font-medium">{property.owner.name}</div>
                        <div className="text-sm text-muted-foreground">Property Owner</div>
                      </div>
                    </div>
                    <div className="space-y-2 pt-4">
                      <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <a href={`mailto:${property.owner.email}`}>
                          <Mail className="mr-2 h-4 w-4 border-2" />
                          Send Email
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
