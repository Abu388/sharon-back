"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormMessage } from "@/components/ui/form"

interface AddressStepProps {
  formData: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  updateFormData: (data: Partial<AddressStepProps["formData"]>) => void
}

export default function AddressStep({ formData, updateFormData }: AddressStepProps) {
  const [errors, setErrors] = useState({
    address: "",
    city: "",
    zipCode: "",
    country: "",
  })

  const handleBlur = (field: keyof typeof errors) => {
    const newErrors = { ...errors }

    if (field === "address" && !formData.address) {
      newErrors.address = "Street address is required"
    } else if (field === "address") {
      newErrors.address = ""
    }

    if (field === "city" && !formData.city) {
      newErrors.city = "City is required"
    } else if (field === "city") {
      newErrors.city = ""
    }

    if (field === "zipCode" && !formData.zipCode) {
      newErrors.zipCode = "ZIP/Postal code is required"
    } else if (field === "zipCode") {
      newErrors.zipCode = ""
    }

    if (field === "country" && !formData.country) {
      newErrors.country = "Country is required"
    } else if (field === "country") {
      newErrors.country = ""
    }

    setErrors(newErrors)
  }

  const countries = ["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Other"]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">
          Street Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData({ address: e.target.value })}
          onBlur={() => handleBlur("address")}
          placeholder="Enter your street address"
          required
        />
        {errors.address && <FormMessage>{errors.address}</FormMessage>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">
          City <span className="text-destructive">*</span>
        </Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          onBlur={() => handleBlur("city")}
          placeholder="Enter your city"
          required
        />
        {errors.city && <FormMessage>{errors.city}</FormMessage>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            placeholder="Enter your state/province"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">
            ZIP/Postal Code <span className="text-destructive">*</span>
          </Label>
          <Input
            id="zipCode"
            value={formData.zipCode}
            onChange={(e) => updateFormData({ zipCode: e.target.value })}
            onBlur={() => handleBlur("zipCode")}
            placeholder="Enter your ZIP/postal code"
            required
          />
          {errors.zipCode && <FormMessage>{errors.zipCode}</FormMessage>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">
          Country <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.country} onValueChange={(value) => updateFormData({ country: value })}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <FormMessage>{errors.country}</FormMessage>}
      </div>
    </div>
  )
}
