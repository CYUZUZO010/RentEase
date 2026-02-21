import { Button } from "@/components/ui/button"
import { Bed, Bath, Maximize, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const featuredProperties = [
  {
    id: 1,
    title: "Modern DT Apartment",
    location: "Downtown, City Center",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "/modern-downtown-apartment-exterior.jpg",
  },
  {
    id: 2,
    title: "Cozy Suburban House",
    location: "Suburban Area, Green Valley",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    image: "/suburban-house-exterior-with-garden.jpg",
  },
  {
    id: 3,
    title: "Luxury Penthouse Suite",
    location: "DownTown, Kigali City",
    price: 5500,
    bedrooms: 4,
    bathrooms: 3,
    area: 3000,
    image: "/luxury-penthouse-exterior-view1.jpg",
  },
]


export function PropertiesPreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Our Top{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Properties</span>
            </h2>
            <p className="text-muted-foreground text-lg">Handpicked properties that match your lifestyle taste</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex bg-transparent border-3">
            <Link href="/properties">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <Link key={property.id} href={`/properties/${property.id}`} className="group block">
              <div className="rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      Available
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.area} sq ft</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">per month</div>
                    </div>
                    <Button size="sm" variant="ghost" className="border-3">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/properties">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
