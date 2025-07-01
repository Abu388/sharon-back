import React from "react";
import { Button } from "@/components/ui/button";
import { Box, DollarSign } from "lucide-react";

interface DonationTypeStepProps {
  formData: { donationType: string };
  updateFormData: (data: Partial<{ donationType: string }>) => void;
}

const DonationTypeStep: React.FC<DonationTypeStepProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div>
      <div className="flex gap-10 *:cursor-pointer">
        <Button
          variant="outline"
          className={`flex flex-1 flex-col items-center rounded-lg border-2 py-12 shadow-sm transition-colors ${
            formData.donationType === "money"
              ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-400"
              : "border-gray-300 bg-gray-100 text-black hover:bg-blue-100"
          }`}
          onClick={() => updateFormData({ donationType: "money" })}
        >
          <DollarSign />
          Money Donation
        </Button>
        <Button
          variant="outline"
          className={`flex flex-1 flex-col items-center rounded-lg border-2 py-12 shadow-sm transition-colors ${
            formData.donationType === "material"
              ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-400"
              : "border-gray-300 bg-gray-100 text-black hover:bg-blue-100"
          }`}
          onClick={() => updateFormData({ donationType: "material" })}
        >
          <Box />
          Material Donation
        </Button>
      </div>
    </div>
  );
};

export default DonationTypeStep;
