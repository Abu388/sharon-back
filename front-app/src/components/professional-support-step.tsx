"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProfessionalSupportStepProps {
  formData: {
    professionalSupport: string[]
    otherExpertise: string
  }
  updateFormData: (data: Partial<ProfessionalSupportStepProps["formData"]>) => void
}

export default function ProfessionalSupportStep({ formData, updateFormData }: ProfessionalSupportStepProps) {
  const professionalOptions = [
    "Theology teacher",
    "Psychologist",
    "Musician",
    "Literature/art expert",
    "Artist",
    "Education specialist",
  ]

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      updateFormData({ professionalSupport: [...formData.professionalSupport, value] })
    } else {
      updateFormData({
        professionalSupport: formData.professionalSupport.filter((item) => item !== value),
      })
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-lg mb-4">I offer my expertise in the following field(s):</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professionalOptions.map((option, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Checkbox
              id={`professionalSupport-${index}`}
              checked={formData.professionalSupport.includes(option)}
              onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor={`professionalSupport-${index}`} className="text-gray-700 text-base cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        <Label htmlFor="otherExpertise" className="text-gray-700 text-base">
          Other expertise (please specify):
        </Label>
        <Input
          id="otherExpertise"
          value={formData.otherExpertise}
          onChange={(e) => updateFormData({ otherExpertise: e.target.value })}
          placeholder="Specify other expertise"
          className="h-12 text-base"
        />
      </div>
    </div>
  )
}
