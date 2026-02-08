"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bed, Bath, Maximize, MapPin, MoreVertical, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { deleteProperty, togglePropertyAvailability } from "@/app/actions/properties"
import { useState } from "react"

interface DashboardPropertyCardProps {
  property: {
    id: string
    title: string
    price: number
    location: string
    bedrooms: number
    bathrooms: number
    area: number
    imageUrl: string
    available: boolean
  }
}

export function DashboardPropertyCard({ property }: DashboardPropertyCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this property?")) return

    setIsDeleting(true)
    await deleteProperty(property.id)
  }

  const handleToggleAvailability = async () => {
    await togglePropertyAvailability(property.id)
  }
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.title}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              property.available ? "bg-green-500 text-white" : "bg-orange-500 text-white"
            }`}
          >
            {property.available ? "Available" : "Unavailable"}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/properties/${property.id}/edit`} className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleToggleAvailability} className="cursor-pointer">
                {property.available ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Mark Unavailable
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Mark Available
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/properties/${property.id}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  View Public Page
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 line-clamp-1">{property.title}</h3>
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

        <div className="pt-4 border-t border-border">
          <div className="text-2xl font-bold text-primary">${property.price.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">per month</div>
        </div>
      </div>
    </div>
  )
}
