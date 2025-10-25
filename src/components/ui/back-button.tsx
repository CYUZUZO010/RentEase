"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  href?: string
  label?: string
}

export function BackButton({ href, label = "Back" }: BackButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button variant="ghost" onClick={handleClick} className="gap-2 text-muted-foreground hover:text-foreground mb-6 cursor-pointer">
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  )
}
