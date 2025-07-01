"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface DonationAmountStepProps {
  formData: {
    amount: string
    customAmount: string
    frequency: string
  }
  updateFormData: (data: Partial<DonationAmountStepProps["formData"]>) => void
}

export default function DonationAmountStep({ formData, updateFormData }: DonationAmountStepProps) {
  const [isCustomAmount, setIsCustomAmount] = useState(false)

  useEffect(() => {
    // Check if the current amount is not one of the preset options
    const presetAmounts = ["25", "50", "100", "250", "500"]
    setIsCustomAmount(!presetAmounts.includes(formData.amount))
  }, [formData.amount])

  const handleAmountChange = (value: string) => {
    if (value === "custom") {
      setIsCustomAmount(true)
      updateFormData({ amount: formData.customAmount || "" })
    } else {
      setIsCustomAmount(false)
      updateFormData({ amount: value })
    }
  }

  const handleCustomAmountChange = (value: string) => {
    // Remove non-numeric characters except decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, "")

    // Ensure only one decimal point
    const parts = sanitizedValue.split(".")
    const formattedValue = parts.length > 1 ? `${parts[0]}.${parts.slice(1).join("")}` : sanitizedValue

    updateFormData({
      customAmount: formattedValue,
      amount: isCustomAmount ? formattedValue : formData.amount,
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Select Donation Amount</h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {["25", "50", "100", "250", "500"].map((amount) => (
            <button
              key={amount}
              type="button"
              className={`h-16 text-lg font-medium rounded-md border-2 ${
                formData.amount === amount && !isCustomAmount
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : "border-gray-200 hover:border-blue-400 text-gray-700"
              }`}
              onClick={() => handleAmountChange(amount)}
            >
              ${amount}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 mt-4">
          <input
            type="radio"
            id="custom-amount"
            checked={isCustomAmount}
            onChange={() => handleAmountChange("custom")}
            className="h-4 w-4 text-blue-600"
          />
          <Label htmlFor="custom-amount" className="text-gray-700 text-base">
            Custom Amount:
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">$</span>
            <Input
              id="customAmount"
              value={formData.customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              onClick={() => handleAmountChange("custom")}
              placeholder="Enter amount"
              className="h-12 text-base pl-8"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Donation Frequency</h3>
        <p className="text-gray-600">How often would you like to make this donation?</p>

        <RadioGroup
          value={formData.frequency}
          onValueChange={(value) => updateFormData({ frequency: value })}
          className="grid grid-cols-1 md:grid-cols-3 gap-3"
        >
          <div
            className={`border-2 rounded-md p-4 ${
              formData.frequency === "one-time" ? "border-blue-600 bg-blue-50" : "border-gray-200"
            }`}
          >
            <RadioGroupItem value="one-time" id="one-time" className="sr-only" />
            <Label htmlFor="one-time" className="flex flex-col cursor-pointer">
              <span className="font-medium text-gray-800">One-time</span>
              <span className="text-sm text-gray-500">Single donation</span>
            </Label>
          </div>

          <div
            className={`border-2 rounded-md p-4 ${
              formData.frequency === "monthly" ? "border-blue-600 bg-blue-50" : "border-gray-200"
            }`}
          >
            <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
            <Label htmlFor="monthly" className="flex flex-col cursor-pointer">
              <span className="font-medium text-gray-800">Monthly</span>
              <span className="text-sm text-gray-500">Recurring monthly donation</span>
            </Label>
          </div>

          <div
            className={`border-2 rounded-md p-4 ${
              formData.frequency === "annually" ? "border-blue-600 bg-blue-50" : "border-gray-200"
            }`}
          >
            <RadioGroupItem value="annually" id="annually" className="sr-only" />
            <Label htmlFor="annually" className="flex flex-col cursor-pointer">
              <span className="font-medium text-gray-800">Annually</span>
              <span className="text-sm text-gray-500">Recurring yearly donation</span>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
