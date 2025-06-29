import ApiClient from "@/api/ApiClient";
import DonationAmountStep from "@/components/donation-amount-step";
import DonationReviewStep from "@/components/donation-review-step";
import DonationTypeStep from "@/components/donation-type-step";
import PaymentMethodStep from "@/components/payment-method-step";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import MaterialDonationStep from "../components/material-donation-step";
import DonorInfoStep from "./donor-info-step";

const donationSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z
    .string()
    .min(10, "Address is required and must be at least 10 characters")
    .max(100, "Address must be at most 100 characters"),
  donationType: z.enum(["money", "material"]),
  amount: z.string().optional(),
  frequency: z.enum(["one-time", "monthly", "annually"]).optional(),
  paymentMethod: z.enum(["credit_card", "bank_transfer", "paypal"]).optional(),
  materials: z.array(z.object({ name: z.string(), quantity: z.number() })),
  message: z.string().optional(),
});

export default function DonationForm() {
  const [formData, setFormData] = useState({
    // Donor Information
    fullName: "",
    phoneNumber: "", // Updated to match expected property name
    password: "",
    address: "",
    email: "",
    materials: [] as { name: string; quantity: number }[],
    message: "",

    // Donation Type
    donationType: "money", // "money" or "material"

    // Donation Amount
    amount: "50",
    customAmount: "",
    frequency: "one-time",

    // Payment Method
    paymentMethod: "bank_transfer",
    receipt: undefined as File | undefined,
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = formData.donationType === "money" ? 5 : 4;

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const nextStep = () => {
    try {
      // Validate current step data
      switch (currentStep) {
        case 1:
          donationSchema
            .pick({
              fullName: true,
              email: true,
              phoneNumber: true,
              address: true,
            })
            .parse(formData);
          break;
        case 2:
          donationSchema.pick({ donationType: true }).parse(formData);
          break;
        case 3:
          if (formData.donationType === "money") {
            donationSchema
              .pick({ amount: true, frequency: true })
              .parse(formData);
          } else {
            donationSchema.pick({ materials: true }).parse(formData);
          }
          break;
        case 4:
          if (formData.donationType === "money") {
            donationSchema.pick({ paymentMethod: true }).parse(formData);
          }
          break;
      }

      // Proceed to next step if validation passes
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors.map((err) => err.message).join("\n"));
      }
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

    try {
      // Validate form data
      const validatedData = donationSchema.parse(formData);

      // Validate receipt upload for bank transfer
      if (
        formData.donationType === "money" &&
        formData.paymentMethod === "bank_transfer" &&
        !receiptFile
      ) {
        toast.error(
          "Please upload your bank transfer receipt before submitting",
        );
        return;
      }

      // Prepare form data for submission
      const formDataToSend = new FormData();
      if (receiptFile) {
        formDataToSend.append("receipt", receiptFile, receiptFile.name); // Ensure file is sent with its name
      }
      Object.entries(validatedData).forEach(([key, value]) => {
        // Only include money donation fields if donationType is "money"
        if (
          formData.donationType === "material" &&
          (key === "amount" || key === "frequency" || key === "paymentMethod")
        ) {
          return;
        }
        if (
          formData.donationType === "money" &&
          (key === "materials" || key === "message")
        ) {
          return;
        }
        if (typeof value === "object") {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      // Submit to API
      const response = await ApiClient.post("/donate", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });

      if (response.status < 200 || response.status >= 300) {
        const errorData = response.data;
        throw new Error(errorData.message || "Failed to submit donation");
      }

      toast.success(
        "Thank you for your donation! Your receipt has been uploaded.",
      );

      setCurrentStep(1);
      setFormData({
        fullName: "",
        phoneNumber: "",
        password: "",
        address: "",
        email: "",
        materials: [],
        message: "",
        donationType: "money",
        amount: "50",
        customAmount: "",
        frequency: "one-time",
        paymentMethod: "bank_transfer",
        receipt: undefined,
      });
      setReceiptFile(null);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors.map((err) => `${err.message} \n`));
      } else {
        toast.error(
          error.response.data.message ?? "An unexpected error occurred",
        );
      }
    }
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
          {currentStep < totalSteps && (
            <Button
              type="button"
              onClick={nextStep}
              className="ml-auto bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Continue
            </Button>
          )}
          {currentStep === totalSteps && (
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
