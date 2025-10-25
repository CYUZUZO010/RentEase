import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PropertyForm } from "@/components/property-form";
import { requireOwner } from "@/lib/auth";
import { sql, type Property } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireOwner();
  const { id } = params;

  const properties = (await sql`
    SELECT * FROM properties WHERE id = ${id} LIMIT 1
  `) as Property[];

  if (properties.length === 0) {
    notFound();
  }

  const property = properties[0];

  if (property.ownerId !== user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <Navbar user={user ? { name: user.name, email: user.email, role: user.role } : null} />
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/dashboard" className="border-3">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-2">Edit Property</h1>
            <p className="text-muted-foreground mb-8">
              Update your property details
            </p>

            <PropertyForm property={property} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
