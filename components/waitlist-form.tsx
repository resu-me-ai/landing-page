"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { joinWaitlist } from "@/app/actions/waitlist"
import { useFormStatus } from "react-dom"

const commonRoles = [
  { value: "software-engineering", label: "Software Engineering" },
  { value: "data-science", label: "Data Science" },
  { value: "product-management", label: "Product Management" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "customer-success", label: "Customer Success" },
  { value: "finance", label: "Finance" },
  { value: "hr", label: "Human Resources" },
  { value: "other", label: "Other (please specify)" },
]

export default function WaitlistForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [fileName, setFileName] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const response = await joinWaitlist(formData)

    if (response.success) {
      setIsSubmitted(true)
      toast({
        title: "Welcome to the Waitlist! 🎉",
        description: response.message,
      })
      // Reset the form
      formRef.current?.reset()
      setSelectedRole("")
      setFileName("")
    } else {
      toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    } else {
      setFileName("")
    }
  }

  if (isSubmitted) {
    return (
      <div className="space-y-6 bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900">Thank You for Joining! 🎉</h2>
        <p className="text-gray-600">
          We're cooking up something special! We'll notify you when we're ready to launch.
        </p>
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            Keep an eye on your inbox for updates about beta testing and our official launch.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" placeholder="Doe" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="roleType">What type of roles are you applying to?</Label>
        <Select name="roleType" onValueChange={setSelectedRole} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a role type" />
          </SelectTrigger>
          <SelectContent>
            {commonRoles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRole === "other" && (
        <div className="space-y-2">
          <Label htmlFor="customRole">Please specify the role</Label>
          <Input id="customRole" name="customRole" placeholder="Enter the role you're applying to" required />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="resume">Current Resume (Optional)</Label>
        <div className="flex items-center gap-2">
          <Input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("resume")?.click()}
            className="w-full md:w-auto"
          >
            Choose File
          </Button>
          <span className="text-sm text-slate-500 truncate">{fileName || "No file chosen"}</span>
        </div>
        <p className="text-xs text-slate-500">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
      </div>

      <div className="space-y-2">
        <Label>Would you pay for this type of service?</Label>
        <RadioGroup name="willPay" defaultValue="yes" className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="willPayYes" />
            <Label htmlFor="willPayYes" className="font-normal">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="willPayNo" />
            <Label htmlFor="willPayNo" className="font-normal">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Submitting..." : "Join Waitlist"}
    </Button>
  )
}
