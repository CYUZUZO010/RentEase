import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { requireOwner } from "@/lib/auth"
import { sql, type Property } from "@/lib/db"
import { Plus, Home } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardPropertyCard } from "@/components/dashboard-property-card"

export default async function DashboardPage() {
  const user = await requireOwner()

  const properties = (await sql`
    SELECT * FROM properties
    WHERE "ownerId" = ${user.id}
    ORDER BY "createdAt" DESC
  `) as Property[]

  const stats = {
    total: properties.length,
    available: properties.filter((p) => p.available).length,
    unavailable: properties.filter((p) => !p.available).length,
  }

  const navUser: { name: string | null; email: string; role: string } | null = user
    ? { name: user.name, email: user.email, role: user.role }
    : null

  return (
    <div className="min-h-screen">
      <Navbar user={navUser} />
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-b from-muted/30 to-background py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text">
                    {user.name}
                  </span>
                </h1>
                <p className="text-muted-foreground">Manage your property listings</p>
              </div>
            <Button variant="ghost" asChild size= "lg" className=" border-3">
            <Link href="/#">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
              <Button size="lg" asChild>
                <Link href="/dashboard/properties/new" className="border-3">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Property
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.total}</div>
                    <div className="text-sm text-muted-foreground">Total Properties</div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Home className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.available}</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                  </div>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Home className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">{stats.unavailable}</div>
                    <div className="text-sm text-muted-foreground">Unavailable</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Properties List */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Your Properties</h2>

            {properties.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No properties yet</h3>
                <p className="text-muted-foreground mb-6">Start by adding your first property listing</p>
                <Button asChild>
                  <Link href="/dashboard/properties/new" className="border-3">
                    <Plus className="mr-2 h-5 w-5 " />
                    Add Property
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <DashboardPropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
