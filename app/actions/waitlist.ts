"use server"

import { z } from "zod"

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
    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const roleType = formData.get("roleType") as string
    const customRole = formData.get("customRole") as string
    const willPay = formData.get("willPay") as string
    const resumeFile = formData.get("resume") as File | null

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
      return {
        success: false,
        message: validatedFields.error.errors[0].message || "Invalid form data",
      }
    }

    // Check if email already exists in waitlist
    const emailExists = await checkIfEmailExists(email)
    if (emailExists) {
      return {
        success: true,
        message: "You're already on our waitlist! We'll notify you when we launch.",
      }
    }

    // Process resume file if provided
    let resumeUrl = null
    if (resumeFile && resumeFile.size > 0) {
      // In a real implementation, you would upload this file to a storage service
      // and store the URL in your database
      resumeUrl = await processResumeFile(resumeFile)
    }

    // Store data in database
    await storeInDatabase({
      ...validatedFields.data,
      resumeUrl,
      joinedAt: new Date(),
    })

    return {
      success: true,
      message: "Thank you for joining our waitlist! We'll notify you when we launch.",
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
