import { useState } from "react";
import { Button } from "@/components/ui/button";
import DonationAmountStep from "@/components/donation-amount-step";
import MaterialDonationStep from "../components/material-donation-step";
import PaymentMethodStep from "@/components/payment-method-step";
import DonationReviewStep from "@/components/donation-review-step";
import DonationTypeStep from "@/components/donation-type-step";
import DonorInfoStep from "./donor-info-step";

export default function DonationForm() {
  const [formData, setFormData] = useState({
    // Donor Information
    fullName: "",
    phoneNumber: "", // Updated to match expected property name
    password: "",
    address: "",
    email: "",
    country: "",
    church: "",
    office: "",
    partnerWays: [] as string[],
    professionalSupport: [] as string[],
    otherExpertise: "",
    materials: [] as { name: string; quantity: number }[],
    message: "",

    // Donation Type
    donationType: "money", // "money" or "material"

    // Donation Amount
    amount: "50",
    customAmount: "",
    frequency: "one-time",

    // Payment Method
    paymentMethod: "credit_card",
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = formData.donationType === "money" ? 5 : 4;

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleReceiptUpload = (file: File) => {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, or PDF file");
      return;
    }
    setReceiptFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate receipt upload for bank transfer
    if (formData.paymentMethod === "bank_transfer" && !receiptFile) {
      alert("Please upload your bank transfer receipt before submitting");
      return;
    }

    // Here you would typically:
    // 1. Create a FormData object
    // 2. Append the receipt file
    // 3. Append other form data
    // 4. Send to your backend
    const formDataToSend = new FormData();
    if (receiptFile) {
      formDataToSend.append("receipt", receiptFile);
    }
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "object") {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    // For demo purposes, we'll just log the data
    console.log("Donation submitted:", {
      formData,
      receiptFile: receiptFile
        ? {
            name: receiptFile.name,
            type: receiptFile.type,
            size: receiptFile.size,
          }
        : null,
    });

    // Simulate API call
    alert("Thank you for your donation! Your receipt has been uploaded.");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <DonorInfoStep formData={formData} updateFormData={updateFormData} />
        );
      case 2:
        return (
          <DonationTypeStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        if (formData.donationType === "money") {
          return (
            <DonationAmountStep
              formData={formData}
              updateFormData={updateFormData}
            />
          );
        } else {
          return (
            <MaterialDonationStep
              formData={formData}
              updateFormData={updateFormData}
            />
          );
        }
      case 4:
        if (formData.donationType === "money") {
          return (
            <PaymentMethodStep
              formData={formData}
              updateFormData={updateFormData}
            />
          );
        } else {
          return (
            <DonationReviewStep
              formData={formData}
              onReceiptUpload={handleReceiptUpload}
            />
          );
        }
      case 5:
        return (
          <DonationReviewStep
            formData={formData}
            onReceiptUpload={handleReceiptUpload}
          />
        );
      default:
        return null;
    }
  };

  const stepTitles =
    formData.donationType === "money"
      ? [
          "Personal Information",
          "Choose Donation Type",
          "Donation Amount",
          "Payment Method",
          "Review",
        ]
      : [
          "Personal Information",
          "Choose Donation Type",
          "Material Donation",
          "Review",
        ];

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Complete Your Donation
        </h2>
        <p className="mx-auto max-w-3xl text-gray-600">
          Your donation helps us provide care, education, and support to
          children in need.
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex justify-between">
          {stepTitles.map((title, index) => (
            <div
              key={index}
              className={`text-center ${
                currentStep === index + 1
                  ? "font-medium text-blue-600"
                  : currentStep > index + 1
                    ? "text-blue-400"
                    : "text-gray-400"
              }`}
            >
              <div className="hidden md:block">{title}</div>
              <div className="md:hidden">{index + 1}</div>
            </div>
          ))}
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <form
        onSubmit={
          currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()
        }
      >
        <div className="mb-8">{renderStep()}</div>

        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="px-6 py-2"
            >
              ⬅ Go Back
            </Button>
          )}
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={nextStep}
              className="ml-auto bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="submit"
              className="ml-auto bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Confirm Donation
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
