import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link"
import { BackButton } from "@/components/ui/back-button"
import { Building2, Users, Shield, Award } from "lucide-react"

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text ">
              Get In Touch With RentEase
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have a question, need a help, or want to partner with us? We&apos;d love to hear from you!
              Our team is always ready to assist with property listings, tenant support, and general inquries.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16 bg-card border border-border rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              You can reach our friendly support team anytime through the following channels.
            </p>
            <ul className="text-lg text-muted-foreground leading-relaxed space-y-2">
              <li><strong>Email: </strong>rentease@gmail.com</li>
              <li><strong>Phone: </strong>+250 788 123 456</li>
              <li><strong>Office Hours:</strong>Monday to Friday, 9:00 AM – 6:00 PM</li>
              <li><strong>Location:</strong> Kigali, Rwanda</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center">Why Reach Out to Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                <p className="text-muted-foreground text-sm">Get quick assistance with your account or property listings</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">List Your Property</h3>
                <p className="text-muted-foreground text-sm">Partner with us to list and manage your rental properties</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Technical Support</h3>
                <p className="text-muted-foreground text-sm">Need help using our platform? We’ll guide you every step of the way</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Partnerships</h3>
                <p className="text-muted-foreground text-sm">
                  Collaborate with RentEase to grow your property business
                </p>
              </div>
            </div>


          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Prefer to reach out online? Fill out our contact form and our team will respond as soon as possible.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Whether you&apos;re a property owner, renter, or just exploring our platform, your feedback and inquiries help us improve and serve you better.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We appreciate your trust in RentEase — let&apos;s connect and make renting easier for everyone!
              </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
