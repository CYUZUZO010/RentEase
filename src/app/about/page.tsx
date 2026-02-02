import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"
import { BackButton } from "@/components/ui/back-button"
import { Building2, Users, Shield, Award } from "lucide-react"
import Link from "next/link"

export default async function AboutPage() {
  const user = await getCurrentUser()

  
  return (
    <div className="min-h-screen bg-background">
      <Navbar user={user} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="border-3 w-25 h-12 border-border rounded-md cursor-pointer ">
            
           <Link href="/" className="cursor-pointer">
             <BackButton />
           </Link>
            
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About RentEase
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in finding the perfect rental property. We connect renters with quality homes and
              help property owners reach the right tenants.
            </p>
          </div>

          <div className="mb-16 bg-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              At RentEase, we believe finding a home should be simple, transparent, and stress-free. Our platform is
              designed to make the rental process seamless for both renters and property owners.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We leverage modern technology to provide an intuitive experience that saves time, reduces friction, and
              builds trust between renters and landlords.
            </p>
          </div>

 
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Listings</h3>
              <p className="text-muted-foreground text-sm">
                Verified properties with detailed information and real photos
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community First</h3>
              <p className="text-muted-foreground text-sm">Building lasting relationships between renters and owners</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Trust & Safety</h3>
              <p className="text-muted-foreground text-sm">Secure platform with verified users and protected data</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-muted-foreground text-sm">
                Committed to providing the best rental experience possible
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              RentEase was founded with a simple vision: to revolutionize the rental market by making it more
              accessible, transparent, and efficient for everyone involved.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We understand the challenges both renters and property owners face. That&apos;s why we&apos;ve built a platform that
              addresses these pain points with innovative features and a user-friendly interface.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we&apos;re proud to serve thousands of users, helping them find their perfect match in the rental
              market.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
