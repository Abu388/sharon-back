import React from "react";

interface DonationReviewStepProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
    country: string;
    materials: { name: string; quantity: number }[];
    message: string;
    paymentMethod: string;
  };
  onReceiptUpload?: (file: File) => void;
}

const DonationReviewStep: React.FC<DonationReviewStepProps> = ({
  formData,
  onReceiptUpload,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onReceiptUpload?.(file);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-gray-800">
          Review Your Donation
        </h3>
        <p className="mt-2 text-gray-600">
          Please review your donation details before submitting.
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-2">
        <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
          Donor Information
        </h4>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 pt-2 md:grid-cols-2">
          <div>
            <span className="text-gray-500">Full Name:</span>
            <p className="font-medium text-gray-800">{formData.fullName}</p>
          </div>

          <div>
            <span className="text-gray-500">phone:</span>
            <p className="font-medium text-gray-800">{formData.phoneNumber}</p>
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
        </div>
      </div>

      {/* Material Donation */}
      {formData.materials.length > 0 && (
        <div className="space-y-2">
          <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
            Material Donation
          </h4>
          <ul className="list-disc space-y-1 pt-2 pl-5">
            {formData.materials.map((material, index) => (
              <li key={index} className="text-gray-800">
                {material.name} - Quantity: {material.quantity}
              </li>
            ))}
            {formData.message && (
              <p className="text-gray-600">Message: {formData.message}</p>
            )}
          </ul>
        </div>
      )}

      {/* Receipt Upload for Bank Transfer */}
      {formData.paymentMethod === "bank_transfer" && (
        <div className="space-y-2">
          <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
            Upload Bank Transfer Receipt
          </h4>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="block w-full rounded-md border border-gray-300 p-2"
          />
        </div>
      )}
    </div>
  );
};

export default DonationReviewStep;
