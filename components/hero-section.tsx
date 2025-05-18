"use client"

import { Toaster } from "@/components/ui/toaster"
import WaitlistForm from "@/components/waitlist-form"

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
            Land Your Dream Job with AI-Powered Resume Builder
          </h1>
          <p className="max-w-[800px] mx-auto text-slate-700 md:text-xl">
            Create a professional resume that stands out and prepare for interviews with our AI voice avatar mock
            interviews.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="order-2 md:order-1">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">Join Our Waitlist</h2>
              <WaitlistForm />
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/placeholder.png"
                alt="AI Resume Builder Dashboard Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-black/0 rounded-xl"></div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">AI-Powered Resume Builder</h3>
                  <p className="text-slate-600 text-sm">Create professional, ATS-optimized resumes in minutes</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">AI Voice Mock Interviews</h3>
                  <p className="text-slate-600 text-sm">Practice with realistic AI-powered interview simulations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}
