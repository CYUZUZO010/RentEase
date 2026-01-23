import { login } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  
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
          <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
          <form action={login} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email:</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password:</Label>
              <Input id="password" name="password" type="password" placeholder="••••••••" required />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-primary hover:underline cursor-pointer">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full border-3 cursor-pointer" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/register" className="text-primary hover:underline font-medium cursor-pointer">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
