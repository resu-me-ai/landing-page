export type WaitlistEntry = {
  id: string
  firstName: string
  lastName: string
  email: string
  roleType: string
  customRole?: string
  willPay: "yes" | "no"
  resumeUrl?: string | null
  joinedAt: Date
  ipAddress?: string
}

// This is just a type definition for documentation purposes
// You'll implement the actual database schema with your chosen database provider
