import { useState } from "react";
import { Button } from "@/components/ui/button";
import PersonalInfoStep from "@/components/personal-info-step";
import PartnershipWaysStep from "@/components/partnership-ways-step";
import ProfessionalSupportStep from "@/components/professional-support-step";
import ReviewStep from "@/components/review-step";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import ApiClient from "@/api/ApiClient";
import JoinUsReviewStep from "./join-us-review-step";

export default function JoinUsForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    phone: "",
    password: "",
    address: "",
    email: "",
    country: "",
    church: "",
    office: "",

    // Ways to Partner
    partnerWays: [] as string[],

    // Professional Support
    professionalSupport: [] as string[],
    otherExpertise: "",
  });

  const totalSteps = 4;

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName &&
          formData.email &&
          formData.phone &&
          formData.password
        );
      case 2:
        return formData.partnerWays.length > 0;
      case 3:
        return (
          formData.professionalSupport.length > 0 || formData.otherExpertise
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      if (validateStep()) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        toast.error("Please fill in all required fields before proceeding.", {
          icon: <CircleAlert className="text-red-500" />,
        });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await ApiClient.post("/partnership", formData);
      console.log("Form submitted successfully:", response.data);
      toast("Success", {
        description: "Form submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.", {
        icon: <CircleAlert className="text-red-500" />,
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <PartnershipWaysStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <ProfessionalSupportStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return <JoinUsReviewStep formData={formData} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    "Personal Information",
    "Ways to Partner",
    "Professional Support",
    "Review",
  ];

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-sm">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Call for Partnership
        </h2>
        <p className="mx-auto max-w-3xl text-gray-600">
          Sharon Children's Ministry Ethiopia (SCM) invites you to join us in
          our mission. We welcome partners from all walks of life to contribute
          in various capacities.
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
        onSubmit={(e) => {
          if (currentStep === totalSteps) {
            handleSubmit(e);
          } else {
            e.preventDefault();
          }
        }}
      >
        <div className="mb-8">{renderStep()}</div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2"
          >
            Previous
          </Button>
          {currentStep !== totalSteps && (
            <Button
              type="button"
              onClick={nextStep}
              className="bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Next
            </Button>
          )}
          {currentStep === totalSteps && (
            <Button
              type="submit"
              className="bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
