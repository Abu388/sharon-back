"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface PaymentMethodStepProps {
  formData: {
    paymentMethod: string
  }
  updateFormData: (data: Partial<PaymentMethodStepProps["formData"]>) => void
}

export default function PaymentMethodStep({ formData, updateFormData }: PaymentMethodStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">Choose Payment Method</h3>
        <p className="text-gray-600">Select how you would like to make your donation:</p>

        <div className="space-y-2">
          <Label htmlFor="paymentMethod" className="text-gray-700 text-base">
            Payment Method
          </Label>
          <Select value={formData.paymentMethod} onValueChange={(value) => updateFormData({ paymentMethod: value })}>
            <SelectTrigger id="paymentMethod" className="h-12 text-base">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.paymentMethod === "credit_card" && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">
              You will be redirected to our secure payment processor to complete your credit card payment after
              reviewing your donation.
            </p>
          </div>
        )}

        {formData.paymentMethod === "paypal" && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">
              You will be redirected to PayPal to complete your donation after reviewing your information.
            </p>
          </div>
        )}

        {formData.paymentMethod === "bank_transfer" && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600 mb-4">
              After confirming your donation, you will receive bank transfer instructions via email.
            </p>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-500">Bank Name:</span>
                <span className="col-span-2 font-medium">Sharon Children's Services Bank</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-500">Account Name:</span>
                <span className="col-span-2 font-medium">Sharon Children's Services</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-500">Reference:</span>
                <span className="col-span-2 font-medium">Donation - [Your Name]</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
