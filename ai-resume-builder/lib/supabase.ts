import { createClient } from "@supabase/supabase-js"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// For server components and server actions
export function createServerSupabaseClient() {
  return createServerComponentClient({ cookies })
}

// For client components (singleton pattern)
export const createBrowserSupabaseClient = () => {
  return createClientComponentClient()
}

// For direct access in server-side code outside of Next.js components
export const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
