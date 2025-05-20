"use server"

import { z } from "zod"
import { supabase } from "@/lib/supabase"
import type { WaitlistEntry } from "@/app/types/schema"

// Form validation schema
const WaitlistSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  roleType: z.string().min(1, { message: "Role type is required" }),
  customRole: z.string().optional(),
  willPay: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  // We'll handle the resume file separately
})

export type WaitlistFormData = z.infer<typeof WaitlistSchema>

type WaitlistResponse = {
  success: boolean
  message: string
}

export async function joinWaitlist(formData: FormData): Promise<WaitlistResponse> {
  try {
    console.log('Starting waitlist submission...')

    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const roleType = formData.get("roleType") as string
    const customRole = formData.get("customRole") as string
    const willPay = formData.get("willPay") as string
    const resumeFile = formData.get("resume") as File | null

    console.log('Form data extracted:', { firstName, lastName, email, roleType, customRole, willPay })

    // Validate form data
    const validatedFields = WaitlistSchema.safeParse({
      firstName,
      lastName,
      email,
      roleType,
      customRole: roleType === "other" ? customRole : undefined,
      willPay,
    })

    if (!validatedFields.success) {
      console.log('Validation failed:', validatedFields.error)
      return {
        success: false,
        message: validatedFields.error.errors[0].message || "Invalid form data",
      }
    }

    console.log('Checking if email exists...')
    // Check if email already exists in waitlist
    const { data: existingEntry, error: checkError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single()

    if (checkError) {
      console.error('Error checking email:', checkError)
    }

    if (existingEntry) {
      console.log('Email already exists')
      return {
        success: true,
        message: "You're already on our waitlist! We'll notify you when we launch.",
      }
    }

    // Process resume file if provided
    let resumeUrl = null
    if (resumeFile && resumeFile.size > 0) {
      console.log('Processing resume file...')
      const fileExt = resumeFile.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile)

      if (uploadError) {
        console.error('Error uploading resume:', uploadError)
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName)
        resumeUrl = publicUrl
        console.log('Resume uploaded successfully:', resumeUrl)
      }
    }

    console.log('Storing data in database...')
    // Store data in database
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          role_type: roleType,
          custom_role: customRole,
          will_pay: willPay,
          resume_url: resumeUrl,
          joined_at: new Date().toISOString(),
        }
      ])

    if (insertError) {
      console.error('Error inserting into database:', insertError)
      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      }
    }

    console.log('Successfully added to waitlist')
    return {
      success: true,
      message: "Thank you for joining our waitlist! We'll keep you updated on our progress, including beta testing opportunities and our official launch. Stay tuned for exciting updates!",
    }
  } catch (error) {
    console.error("Waitlist submission error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}

// Helper function to check if email already exists
async function checkIfEmailExists(email: string): Promise<boolean> {
  // TODO: Replace with actual database query
  console.log(`Checking if email exists: ${email}`)
  return false
}

// Helper function to process resume file
async function processResumeFile(file: File): Promise<string | null> {
  // TODO: Replace with actual file upload logic
  // For example, upload to Vercel Blob, AWS S3, etc.
  console.log(`Processing resume file: ${file.name}, size: ${file.size} bytes`)

  // Return a placeholder URL
  return `https://storage.example.com/resumes/${Date.now()}-${file.name}`
}

// Helper function to store data in database
async function storeInDatabase(data: any): Promise<void> {
  // TODO: Replace with actual database insertion
  console.log("Storing data in database:", data)

  // Simulate a small delay to mimic database operation
  await new Promise((resolve) => setTimeout(resolve, 500))
}
