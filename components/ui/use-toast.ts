"use client"

// This is a simplified version of the toast hook
import { toast as sonnerToast } from "@/components/ui/toaster"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function toast({ title, description, variant = "default" }: ToastProps) {
  return sonnerToast({
    title,
    description,
    variant,
  })
}

function useToast() {
  return {
    toast,
  }
}

export { useToast }
