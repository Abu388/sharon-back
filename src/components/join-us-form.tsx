import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import PersonalInfoStep from "@/components/personal-info-step"
import PartnershipWaysStep from "@/components/partnership-ways-step"
import ProfessionalSupportStep from "@/components/professional-support-step"
import MaterialSupportStep from "@/components/material-support-step"
import ReviewStep from "@/components/review-step"

export default function JoinUsForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    phone: "",
    address: "",
    email: "",
    country: "",
    church: "",
    office: "",

    // Ways to Partner
    partnerWays: [] as string[],

    // Professional Support
    professionalSupport: [] as string[],
    otherExpertise: "",

    // Material Support
    materials: [
      { type: "", quantity: "" },
      { type: "", quantity: "" },
      { type: "", quantity: "" },
    ],
    message: "",
  })

  const totalSteps = 5

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    // For demo purposes, we'll just show an alert
    alert("Form submitted successfully!")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <PartnershipWaysStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <ProfessionalSupportStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <MaterialSupportStep formData={formData} updateFormData={updateFormData} />
      case 5:
        return <ReviewStep formData={formData} />
      default:
        return null
    }
  }

  const stepTitles = ["Personal Information", "Ways to Partner", "Professional Support", "Material Support", "Review"]

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Call for Partnership</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Sharon Children's Ministry Ethiopia (SCM) invites you to join us in our mission. We welcome partners from all
          walks of life to contribute in various capacities.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {stepTitles.map((title, index) => (
            <div
              key={index}
              className={`text-center ${
                currentStep === index + 1
                  ? "text-blue-600 font-medium"
                  : currentStep > index + 1
                    ? "text-blue-400"
                    : "text-gray-400"
              }`}
            >
              <div className="hidden md:block">{title}</div>
              <div className="md:hidden">{index + 1}</div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
        <div className="mb-8">{renderStep()}</div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1} className="px-6 py-2">
            Previous
          </Button>
          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Next
            </Button>
          ) : (
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
