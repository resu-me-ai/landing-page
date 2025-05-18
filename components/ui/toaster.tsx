import type * as React from "react"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"

import { cn } from "@/lib/utils"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 100000

type ToasterProps = React.HTMLAttributes<HTMLDivElement>

function Toaster({ className }: ToasterProps) {
  return (
    <ToastProvider>
    <ToastViewport className= { cn("z-[100]") } />
    </ToastProvider>
  )
}

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

let toastTimeout: NodeJS.Timeout

function toast({ title, description, variant = "default" }: ToastProps) {
  if (toastTimeout) {
    clearTimeout(toastTimeout)
  }
  const id = Math.random().toString(36).substring(2)
  const event = new CustomEvent("updateToast", {
    detail: {
      id,
      title,
      description,
      variant,
    },
  })
  document.dispatchEvent(event)
}

export { Toaster, toast, Toast, ToastClose, ToastDescription, ToastTitle }
