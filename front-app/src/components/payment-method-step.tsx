"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface PaymentMethodStepProps {
  formData: {
    paymentMethod: string;
  };
  updateFormData: (data: Partial<PaymentMethodStepProps["formData"]>) => void;
}

const stripePromise = loadStripe("pk_test_51NxxxxxxxReplaceWithYourOwnKey"); // Use your own test key

export default function PaymentMethodStep({
  formData,
  updateFormData,
}: PaymentMethodStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">
          Choose Payment Method
        </h3>
        <p className="text-gray-600">
          Select how you would like to make your donation:
        </p>

        <div className="space-y-2">
          <Label htmlFor="paymentMethod" className="text-base text-gray-700">
            Payment Method
          </Label>
          <Select
            value={formData.paymentMethod}
            onValueChange={(value) => updateFormData({ paymentMethod: value })}
          >
            <SelectTrigger id="paymentMethod" className="h-12 text-base">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card" disabled>
                Credit Card
              </SelectItem>
              <SelectItem value="paypal" disabled>
                PayPal
              </SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.paymentMethod === "credit_card" && (
          <Elements stripe={stripePromise}>
            <div className="mt-6 rounded-md bg-gray-50 p-4">
              <Label
                htmlFor="card-element"
                className="mb-2 block text-base text-gray-700"
              >
                Card Details
              </Label>
              <div className="rounded-md border bg-white p-3">
                <CardElement
                  id="card-element"
                  options={{ hidePostalCode: true }}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Use 4242 4242 4242 4242 for test payments.
              </p>
            </div>
          </Elements>
        )}

        {formData.paymentMethod === "paypal" && (
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <p className="text-gray-600">
              You will be redirected to PayPal to complete your donation after
              reviewing your information.
            </p>
          </div>
        )}

        {formData.paymentMethod === "bank_transfer" && (
          <div className="mt-6 rounded-md bg-gray-50 p-4">
            <p className="mb-4 text-gray-600">
              After confirming your donation, you will receive bank transfer
              instructions via SMS.
            </p>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-3">
                <span className="text-gray-500">Bank Name:</span>
                <span className="col-span-2 font-medium">
                  Commercial Bank of Ethiopia, Arada Branch
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-500">Account Name:</span>
                <span className="col-span-2 font-medium">
                  Sharon Children's Ministry Ethiopia
                </span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-500">Account Number:</span>
                <span className="col-span-2 font-medium">1000004327601</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-gray-500">SWIFT Code:</span>
                <span className="col-span-2 font-medium">CBETETAA</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
