import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ReviewStepProps {
  formData: {
    // Personal Information
    fullName: string;
    phone: string;
    address: string;
    email: string;
    country: string;
    church: string;
    office: string;

    // Ways to Partner
    partnerWays: string[];

    // Professional Support
    professionalSupport: string[];
    otherExpertise: string;

    // Material Support
    materials: Array<{ type: string; quantity: string }>;
    message: string;

    // Donation Details
    customAmount: string;
    amount: string;
    frequency: string;
    paymentMethod: string;
  };
  onReceiptUpload?: (file: File) => void;
}

export default function ReviewStep({
  formData,
  onReceiptUpload,
}: ReviewStepProps) {
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setReceiptPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setReceiptPreview(null);
      }
      // Notify parent component about the upload
      onReceiptUpload?.(file);
    }
  };

  // Determine the correct amount to display
  const donationAmount =
    formData.customAmount && formData.customAmount !== ""
      ? formData.customAmount
      : formData.amount;
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-gray-800">
          Review Your Information
        </h3>
        <p className="mt-2 text-gray-600">
          Please review your donation information before submitting.
        </p>
      </div>

      {/* Donation Details */}
      <div className="space-y-2">
        <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
          Donation Details
        </h4>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 pt-2 md:grid-cols-2">
          <div>
            <span className="text-gray-500">Amount:</span>
            <p className="font-medium text-gray-800">${donationAmount}</p>
          </div>
          <div>
            <span className="text-gray-500">Frequency:</span>
            <p className="font-medium text-gray-800">
              {formData.frequency === "one-time"
                ? "One-time"
                : formData.frequency.charAt(0).toUpperCase() +
                  formData.frequency.slice(1)}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Payment Method:</span>
            <p className="font-medium text-gray-800">
              {formData.paymentMethod === "credit_card"
                ? "Credit Card"
                : formData.paymentMethod === "paypal"
                  ? "PayPal"
                  : formData.paymentMethod === "bank_transfer"
                    ? "Bank Transfer"
                    : formData.paymentMethod}
            </p>
          </div>
        </div>
      </div>

      {/* Bank Transfer Receipt Upload Section */}
      {formData.paymentMethod === "bank_transfer" && (
        <div className="space-y-4 border-t pt-4">
          <h4 className="text-lg font-medium text-gray-700">
            Bank Transfer Receipt
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="receipt-upload" className="text-gray-700">
                Upload your bank transfer receipt
              </Label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="receipt-upload"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={() =>
                    document.getElementById("receipt-upload")?.click()
                  }
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  Choose File
                </Button>
                {receiptFile && (
                  <span className="text-sm text-gray-600">
                    {receiptFile.name}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Accepted formats: JPG, PNG, PDF (max 5MB)
              </p>
            </div>

            {/* Receipt Preview */}
            {receiptPreview && (
              <div className="mt-4">
                <h5 className="mb-2 text-sm font-medium text-gray-700">
                  Receipt Preview:
                </h5>
                <div className="max-w-md rounded-md border p-2">
                  <img
                    src={receiptPreview}
                    alt="Receipt preview"
                    className="h-auto max-w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-2">
        <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 pt-2 md:grid-cols-2">
          <div>
            <span className="text-gray-500">Full Name:</span>
            <p className="font-medium text-gray-800">{formData.fullName}</p>
          </div>

          <div>
            <span className="text-gray-500">Phone:</span>
            <p className="font-medium text-gray-800">{formData.phone}</p>
          </div>

          <div>
            <span className="text-gray-500">Email:</span>
            <p className="font-medium text-gray-800">{formData.email}</p>
          </div>

          {formData.address && (
            <div>
              <span className="text-gray-500">Address:</span>
              <p className="font-medium text-gray-800">{formData.address}</p>
            </div>
          )}

          {formData.country && (
            <div>
              <span className="text-gray-500">Country:</span>
              <p className="font-medium text-gray-800">{formData.country}</p>
            </div>
          )}

          {formData.church && (
            <div>
              <span className="text-gray-500">Church:</span>
              <p className="font-medium text-gray-800">{formData.church}</p>
            </div>
          )}

          {formData.office && (
            <div>
              <span className="text-gray-500">Office:</span>
              <p className="font-medium text-gray-800">{formData.office}</p>
            </div>
          )}
        </div>
      </div>

      {/* Ways to Partner */}
      {formData.partnerWays.length > 0 && (
        <div className="space-y-2">
          <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
            Ways to Partner
          </h4>
          <ul className="list-disc space-y-1 pt-2 pl-5">
            {formData.partnerWays.map((way, index) => (
              <li key={index} className="text-gray-800">
                {way}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Professional Support */}
      {(formData.professionalSupport.length > 0 || formData.otherExpertise) && (
        <div className="space-y-2">
          <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
            Professional Support
          </h4>
          <div className="pt-2">
            {formData.professionalSupport.length > 0 && (
              <ul className="list-disc space-y-1 pl-5">
                {formData.professionalSupport.map((support, index) => (
                  <li key={index} className="text-gray-800">
                    {support}
                  </li>
                ))}
              </ul>
            )}
            {formData.otherExpertise && (
              <div className="mt-2">
                <span className="text-gray-500">Other expertise:</span>
                <p className="font-medium text-gray-800">
                  {formData.otherExpertise}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Material Support */}
      <div className="space-y-2">
        <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
          Material Support
        </h4>
        <div className="pt-2">
          {formData.materials.some((m) => m.type || m.quantity) && (
            <div className="mb-4">
              <h5 className="mb-2 font-medium text-gray-600">Materials:</h5>
              {formData.materials.map((material, index) =>
                material.type || material.quantity ? (
                  <div key={index} className="mb-2">
                    {material.type && (
                      <span className="text-gray-800">
                        Type: {material.type}
                      </span>
                    )}
                    {material.type && material.quantity && <span> - </span>}
                    {material.quantity && (
                      <span className="text-gray-800">
                        Quantity: {material.quantity}
                      </span>
                    )}
                  </div>
                ) : null,
              )}
            </div>
          )}

          <div>
            <h5 className="mb-2 font-medium text-gray-600">Message:</h5>
            <p className="whitespace-pre-wrap text-gray-800">
              {formData.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
