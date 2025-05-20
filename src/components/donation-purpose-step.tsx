"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface DonationPurposeStepProps {
  formData: {
    purpose: string
    specificPurpose: string
    honoree: string
    message: string
  }
  updateFormData: (data: Partial<DonationPurposeStepProps["formData"]>) => void
}

export default function DonationPurposeStep({ formData, updateFormData }: DonationPurposeStepProps) {
  const purposes = [
    { value: "general", label: "General Fund", description: "Support our overall mission and greatest needs" },
    { value: "education", label: "Education", description: "Help provide educational resources and scholarships" },
    { value: "health", label: "Healthcare", description: "Support medical care and health initiatives" },
    { value: "nutrition", label: "Nutrition", description: "Provide nutritious meals and food security" },
    { value: "specific", label: "Specific Project", description: "Designate your gift to a specific project" },
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Donation Purpose</h3>
        <p className="text-gray-600">Please select where you would like your donation to be directed:</p>

        <RadioGroup
          value={formData.purpose}
          onValueChange={(value) => updateFormData({ purpose: value })}
          className="space-y-3"
        >
          {purposes.map((purpose) => (
            <div
              key={purpose.value}
              className={`border-2 rounded-md p-4 ${
                formData.purpose === purpose.value ? "border-blue-600 bg-blue-50" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value={purpose.value} id={purpose.value} className="sr-only" />
              <Label htmlFor={purpose.value} className="flex flex-col cursor-pointer">
                <span className="font-medium text-gray-800">{purpose.label}</span>
                <span className="text-sm text-gray-500">{purpose.description}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {formData.purpose === "specific" && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="specificPurpose" className="text-gray-700">
              Please specify the project or purpose:
            </Label>
            <Input
              id="specificPurpose"
              value={formData.specificPurpose}
              onChange={(e) => updateFormData({ specificPurpose: e.target.value })}
              placeholder="Enter specific project or purpose"
              className="h-12 text-base"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Dedicate Your Donation (Optional)</h3>

        <div className="space-y-2">
          <Label htmlFor="honoree" className="text-gray-700">
            In Honor/Memory of:
          </Label>
          <Input
            id="honoree"
            value={formData.honoree}
            onChange={(e) => updateFormData({ honoree: e.target.value })}
            placeholder="Enter name"
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-700">
            Personal Message:
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => updateFormData({ message: e.target.value })}
            placeholder="Enter a personal message (optional)"
            className="min-h-[100px] text-base"
          />
        </div>
      </div>
    </div>
  )
}
