import Link from "next/link"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/waitlist" className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Waitlist Management</h2>
          <p className="text-gray-600">View and manage waitlist signups</p>
        </Link>

        <div className="bg-white p-6 rounded shadow opacity-50">
          <h2 className="text-xl font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600">Coming soon</p>
        </div>
      </div>
    </div>
  )
}
