"use server"

import { z } from "zod"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

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
    // Initialize Supabase client
    const supabase = createServerComponentClient({ cookies })

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
    const { data: existingUser, error: lookupError } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle()

    if (lookupError) {
      console.error("Error checking existing email:", lookupError)
      return {
        success: false,
        message: "Error checking email. Please try again.",
      }
    }

    if (existingUser) {
      return {
        success: true,
        message: "You're already on our waitlist! We'll notify you when we launch.",
      }
    }

    // Process resume file if provided
    let resumeUrl = null
    if (resumeFile && resumeFile.size > 0) {
      // Check file size (5MB limit)
      if (resumeFile.size > 5 * 1024 * 1024) {
        return {
          success: false,
          message: "Resume file is too large. Maximum size is 5MB.",
        }
      }

      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!allowedTypes.includes(resumeFile.type)) {
        return {
          success: false,
          message: "Invalid file type. Please upload a PDF or Word document.",
        }
      }

      // Generate a unique filename
      const timestamp = Date.now()
      const fileExt = resumeFile.name.split(".").pop()
      const fileName = `${email.replace(/[^a-zA-Z0-9]/g, "")}-${timestamp}.${fileExt}`

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, resumeFile, {
          cacheControl: "3600",
          upsert: false,
        })

      if (uploadError) {
        console.error("Error uploading resume:", uploadError)
        return {
          success: false,
          message: "Failed to upload resume. Please try again.",
        }
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName)
      resumeUrl = urlData.publicUrl
    }

    // Store data in database
    const { error: insertError } = await supabase.from("waitlist").insert({
      first_name: validatedFields.data.firstName,
      last_name: validatedFields.data.lastName,
      email: validatedFields.data.email,
      role_type: validatedFields.data.roleType,
      custom_role: validatedFields.data.roleType === "other" ? validatedFields.data.customRole : null,
      will_pay: validatedFields.data.willPay === "yes",
      resume_url: resumeUrl,
    })

    if (insertError) {
      console.error("Error inserting waitlist entry:", insertError)
      return {
        success: false,
        message: "Failed to join waitlist. Please try again.",
      }
    }

    // Revalidate the waitlist page to reflect the new entry
    revalidatePath("/")

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
