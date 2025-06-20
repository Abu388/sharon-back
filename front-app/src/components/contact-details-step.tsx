import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormMessage } from "@/components/ui/form"

interface ContactDetailsStepProps {
  formData: {
    phone: string
    preferredContact: string
  }
  updateFormData: (data: Partial<ContactDetailsStepProps["formData"]>) => void
}

export default function ContactDetailsStep({ formData, updateFormData }: ContactDetailsStepProps) {
  const [errors, setErrors] = useState({
    phone: "",
  })

  const validatePhone = (phone: string) => {
    // Basic phone validation - can be enhanced based on requirements
    return phone.length >= 10
  }

  const handleBlur = () => {
    const newErrors = { ...errors }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    } else {
      newErrors.phone = ""
    }

    setErrors(newErrors)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          onBlur={handleBlur}
          placeholder="Enter your phone number"
          required
        />
        {errors.phone && <FormMessage>{errors.phone}</FormMessage>}
      </div>

      <div className="space-y-2">
        <Label>
          Preferred Contact Method <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={formData.preferredContact}
          onValueChange={(value) => updateFormData({ preferredContact: value })}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email-contact" />
            <Label htmlFor="email-contact">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone-contact" />
            <Label htmlFor="phone-contact">Phone</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both-contact" />
            <Label htmlFor="both-contact">Both</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
