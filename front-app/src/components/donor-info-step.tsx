import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DonorInfoStepProps {
  formData: {
    fullName: string
    phoneNumber: string
    email: string
  }
  updateFormData: (data: Partial<DonorInfoStepProps["formData"]>) => void
}

export default function DonorInfoStep({ formData, updateFormData }: DonorInfoStepProps) {
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  })

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleBlur = (field: keyof typeof errors) => {
    const newErrors = { ...errors }

    if (field === "fullName" && !formData.fullName) {
      newErrors.fullName = "Full name is required"
    } else if (field === "fullName") {
      newErrors.fullName = ""
    }

    if (field === "phoneNumber" && !formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (field === "phoneNumber") {
      newErrors.phoneNumber = ""
    }

    if (field === "email") {
      if (!formData.email) {
        newErrors.email = "Email is required"
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      } else {
        newErrors.email = ""
      }
    }

    setErrors(newErrors)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-700 text-base">
            Full Name
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            onBlur={() => handleBlur("fullName")}
            placeholder="Enter your full name"
            required
            className="h-12 text-base"
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-gray-700 text-base">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            onBlur={() => handleBlur("phoneNumber")}
            placeholder="Enter your phone number"
            required
            className="h-12 text-base"
          />
          {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 text-base">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder="Enter your email address"
            required
            className="h-12 text-base"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
      </div>
    </div>
  )
}
