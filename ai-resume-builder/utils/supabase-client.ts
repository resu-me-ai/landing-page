import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Create a single instance of the Supabase client to be reused
export const supabase = createClientComponentClient()
