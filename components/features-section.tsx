import { CheckCircle2, FileText, Mic, Award } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <FileText className="h-10 w-10 text-emerald-500" />,
      title: "AI Resume Builder",
      description:
        "Our AI analyzes your experience and skills to create a professional, ATS-optimized resume that stands out to recruiters.",
    },
    {
      icon: <Mic className="h-10 w-10 text-emerald-500" />,
      title: "AI Voice Mock Interviews",
      description:
        "Practice with our AI voice avatar that simulates real interview scenarios and provides instant feedback.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-emerald-500" />,
      title: "Personalized Feedback",
      description:
        "Get actionable insights on how to improve your resume and interview skills based on industry standards.",
    },
    {
      icon: <Award className="h-10 w-10 text-emerald-500" />,
      title: "Industry-Specific Templates",
      description:
        "Choose from a variety of templates tailored to your industry to maximize your chances of getting noticed.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Choose Our AI Resume Builder
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with industry expertise to help you land your dream job.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
