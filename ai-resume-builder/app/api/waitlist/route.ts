import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    // Get query parameters
    const url = new URL(request.url)
    const roleType = url.searchParams.get("roleType")
    const limit = Number.parseInt(url.searchParams.get("limit") || "100")
    const page = Number.parseInt(url.searchParams.get("page") || "0")
    const offset = page * limit

    // Build query
    let query = supabase
      .from("waitlist")
      .select("id, first_name, last_name, email, role_type, custom_role, will_pay, joined_at")

    // Add filters if provided
    if (roleType) {
      query = query.eq("role_type", roleType)
    }

    // Add pagination
    const { data, error, count } = await query
      .order("joined_at", { ascending: false })
      .range(offset, offset + limit - 1)
      .limit(limit)

    if (error) {
      console.error("Error fetching waitlist entries:", error)
      return NextResponse.json({ error: "Failed to fetch waitlist entries" }, { status: 500 })
    }

    return NextResponse.json({
      data,
      page,
      limit,
      total: count,
      hasMore: data.length === limit,
    })
  } catch (error) {
    console.error("Unexpected error in waitlist route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
