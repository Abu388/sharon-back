import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import DonorInfoStep from "@/components/donor-info-step"
import DonationAmountStep from "@/components/donation-amount-step"
import PaymentMethodStep from "@/components/payment-method-step"
import ReviewStep from "@/components/review-step"

export default function DonationForm() {
  const [formData, setFormData] = useState({
    // Donor Information
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
    country: "",
    church: "",
    office: "",
    partnerWays: [] as string[],
    professionalSupport: [] as string[],
    otherExpertise: "",
    materials: [] as { name: string; quantity: number }[],
    message: "",

    // Donation Amount
    amount: "50",
    customAmount: "",
    frequency: "one-time",

    // Payment Method
    paymentMethod: "credit_card",
  })

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

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
    // Here you would typically process the payment and send the data to your backend
    console.log("Donation submitted:", formData)
    // For demo purposes, we'll just show an alert
    alert("Thank you for your donation!")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DonorInfoStep formData={formData} updateFormData={updateFormData} />
      case 2:
        return <DonationAmountStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <PaymentMethodStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return (
          <ReviewStep
            formData={{
              ...formData,
              phone: formData.phoneNumber,
              materials: formData.materials.map((m) => ({
                type: m.name,
                quantity: String(m.quantity),
              })),
            }}
          />
        )
      default:
        return null
    }
  }

  const stepTitles = ["Donor Information", "Donation Amount", "Payment Method", "Review"]

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Donation</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Your donation helps us provide care, education, and support to children in need.
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
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={prevStep} className="px-6 py-2">
              ⬅ Go Back
            </Button>
          )}
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 ml-auto"
            >
              Continue
            </Button>
          ) : (
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 ml-auto">
              Confirm Donation
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
