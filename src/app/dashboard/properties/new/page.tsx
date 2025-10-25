import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PropertyForm } from "@/components/property-form";
import { requireOwner } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function NewPropertyPage() {
  const user = await requireOwner();

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
            <h1 className="text-4xl font-bold mb-2">Add New Property</h1>
            <p className="text-muted-foreground mb-8">
              Fill in the details to list your property
            </p>

            <PropertyForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
