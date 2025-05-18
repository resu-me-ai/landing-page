import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export default async function WaitlistDashboard() {
  const supabase = createServerComponentClient({ cookies })

  // Fetch waitlist entries
  const { data: entries, error } = await supabase
    .from("waitlist")
    .select("*")
    .order("joined_at", { ascending: false })
    .limit(100)

  // Get role type counts for analytics
  const { data: roleCounts, error: roleError } = await supabase
    .from("waitlist")
    .select("role_type, count")
    .group("role_type")

  // Get will_pay counts for analytics
  const { data: willPayCounts, error: willPayError } = await supabase
    .from("waitlist")
    .select("will_pay, count")
    .group("will_pay")

  if (error || roleError || willPayError) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Waitlist Dashboard</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading waitlist data. Please try again later.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Waitlist Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Signups</h2>
          <p className="text-3xl font-bold">{entries?.length || 0}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Would Pay</h2>
          <p className="text-3xl font-bold">{willPayCounts?.find((item) => item.will_pay)?.count || 0}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Would Not Pay</h2>
          <p className="text-3xl font-bold">{willPayCounts?.find((item) => !item.will_pay)?.count || 0}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Would Pay
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries?.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entry.first_name} {entry.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entry.role_type === "other" ? entry.custom_role : entry.role_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.will_pay ? "Yes" : "No"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {entry.resume_url ? (
                    <a
                      href={entry.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(entry.joined_at).toLocaleString()}</td>
              </tr>
            ))}

            {entries?.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No waitlist entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
