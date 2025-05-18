import type React from "react"
import { cookies } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, you would implement proper authentication
  // This is just a simple example to demonstrate the concept

  // For now, we'll just check if an admin query param is present
  // In a real app, you would check for a valid session
  const searchParams = new URL(cookies().get("next-url")?.value || "http://localhost").searchParams
  const isAdmin = searchParams.get("admin") === "true"

  if (!isAdmin) {
    // In a real app, redirect to login page
    // For this example, we'll just show a message
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
          <p className="mb-4">You need admin access to view this page.</p>
          <p className="text-sm text-gray-500">For demo purposes, add ?admin=true to the URL to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">ResumeAI Admin</h1>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
