import { register } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"


export default async function RegisterPage({ searchParams }: { searchParams?: { error?: string } }) {
  const user = await getCurrentUser()
  if (user) {
    redirect(user.role === "OWNER" ? "/dashboard" : "/properties")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-2">
            <Building2 className="h-8 w-8 text-primary" />
            
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">RentEase</span>
          </Link>
          <h1 className="text-3xl font-bold mt-4">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join RentEase today</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          {searchParams?.error ? (
            <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
              {decodeURIComponent(searchParams.error)}
            </div>
          ) : null}
          <form action={register} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" placeholder="Enter full names here" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required minLength={6} />
              <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
            </div>

            <div className="space-y-3">
              <Label>I am a</Label>
              <RadioGroup name="role" defaultValue="RENTER" required>
                <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <RadioGroupItem value="RENTER" id="renter" />
                  <Label htmlFor="renter" className="flex-1 cursor-pointer">
                    <div className="font-medium">Renter</div>
                    <div className="text-xs text-muted-foreground">Looking for a property to rent</div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  <RadioGroupItem value="OWNER" id="owner" />
                  <Label htmlFor="owner" className="flex-1 cursor-pointer">
                    <div className="font-medium">Property Owner</div>
                    <div className="text-xs text-muted-foreground">Want to list my properties</div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div>
                <Button type="submit" className="w-full border-3 cursor-pointer" size="lg">
                Create Account
              </Button>
            </div>

          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
