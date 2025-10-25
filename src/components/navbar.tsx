"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2, Menu, X } from "lucide-react"
import { useState } from "react"
import { UserMenu } from "@/components/user-menu"

interface NavbarProps {
  user?: {
    name: string | null
    email: string
    role: string
  } | null
}

export function Navbar({ user }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-md border-b border-border ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">RentEase</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <UserMenu user={user} />
                  <span className="text-sm">{user.name}</span>
                </div>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
