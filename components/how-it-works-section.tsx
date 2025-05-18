import { Card, CardContent } from "@/components/ui/card"

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Join the Waitlist",
      description: "Sign up with your email to be the first to know when we launch.",
    },
    {
      number: "02",
      title: "Create Your Profile",
      description: "Input your experience, skills, and career goals.",
    },
    {
      number: "03",
      title: "Generate Your Resume",
      description: "Our AI will create a professional, tailored resume for you.",
    },
    {
      number: "04",
      title: "Practice Interviews",
      description: "Prepare for real interviews with our AI voice avatar.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Our simple process helps you create a professional resume and prepare for interviews.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-emerald-500 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
