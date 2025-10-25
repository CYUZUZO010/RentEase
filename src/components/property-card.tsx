import { Button } from "@/components/ui/button"
import { Bed, Bath, Maximize, MapPin, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    description: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    area: number
    imageUrl: string
    available: boolean
  }
}
//all the property cards will be displayed with this ui .

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={property.imageUrl || "/placeholder.svg"}
            alt={property.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {property.available && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Available
              </span>
            </div>
          )}
        </div>

        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.area} ft²</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <div className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">per month</div>
            </div>
            <Button size="sm" variant="ghost" className="border-3 cursor-pointer">
              View
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}
