"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { createProperty, updateProperty } from "@/app/actions/properties"
import { useState } from "react"

interface PropertyFormProps {
  property?: {
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

export function PropertyForm({ property }: PropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEditing = !!property

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    if (isEditing) {
      await updateProperty(property.id, formData)
    } else {
      await createProperty(formData)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-8">
      <div className="space-y-2">
        <Label htmlFor="title">Property Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Modern Downtown Apartment"
          defaultValue={property?.title}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your property..."
          rows={5}
          defaultValue={property?.description}
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price">Monthly Rent ($)</Label>
          <Input id="price" name="price" type="number" placeholder="2500" defaultValue={property?.price} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="Downtown, City Center"
            defaultValue={property?.location}
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            name="bedrooms"
            type="number"
            min="0"
            placeholder="2"
            defaultValue={property?.bedrooms}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min="0"
            placeholder="2"
            defaultValue={property?.bathrooms}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area (sq ft)</Label>
          <Input id="area" name="area" type="number" placeholder="1200" defaultValue={property?.area} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Main Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://example.com/image.jpg or /placeholder.svg"
          defaultValue={property?.imageUrl}
          required
        />
        <p className="text-xs text-muted-foreground">Enter a URL for the main property image</p>
      </div>

      {isEditing && (
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="space-y-0.5">
            <Label htmlFor="available">Availability Status</Label>
            <p className="text-sm text-muted-foreground">Toggle to mark property as available or unavailable</p>
          </div>
          <Switch id="available" name="available" defaultChecked={property.available} />
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1 border-3 cursor-pointer" >
          {isSubmitting ? "Saving..." : isEditing ? "Update Property" : "Add Property"}
        </Button>
        <Button type="button" variant="outline" size="lg" asChild className="bg-transparent">
          <a href="/dashboard">Cancel</a>
        </Button>
      </div>
    </form>
  )
}
