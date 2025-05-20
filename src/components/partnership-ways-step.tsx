import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface PartnershipWaysStepProps {
  formData: {
    partnerWays: string[]
  }
  updateFormData: (data: Partial<{ partnerWays: string[] }>) => void
}

export default function PartnershipWaysStep({ formData, updateFormData }: PartnershipWaysStepProps) {
  const partnershipOptions = [
    {
      value: "Pray for SCM's vision and mission",
      label: "I pray for SCM's vision and mission",
    },
    {
      value: "Dedicating time to prayer",
      label: "I serve by dedicating time to prayer",
    },
    {
      value: "Hiring staff for ministry",
      label: "Hiring of full-time or part-time staff who have a calling to minister",
    },
    {
      value: "Support indigenous missionaries",
      label: "Permanent support for indigenous missionaries",
    },
    {
      value: "Materials for music and media",
      label: "Various materials for music, media/audio-video studio, and printing works",
    },
  ]

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      updateFormData({ partnerWays: [...formData.partnerWays, value] })
    } else {
      updateFormData({
        partnerWays: formData.partnerWays.filter((item) => item !== value),
      })
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-lg mb-4">Please indicate how you would like to contribute to our ministry:</p>
      <div className="space-y-5">
        {partnershipOptions.map((option, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Checkbox
              id={`partnerWay-${index}`}
              checked={formData.partnerWays.includes(option.value)}
              onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
              className="mt-1"
            />
            <Label htmlFor={`partnerWay-${index}`} className="text-gray-700 text-base cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
