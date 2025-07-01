import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PartnershipWaysStepProps {
  formData: {
    prayerSupport: string[];
    otherSupport: string[];
  };
  updateFormData: (
    data: Partial<{ prayerSupport: string[]; otherSupport: string[] }>,
  ) => void;
}

export default function PartnershipWaysStep({
  formData,
  updateFormData,
}: PartnershipWaysStepProps) {
  const prayerSupport = [
    {
      value: "Pray for SCM's vision and mission",
      label: "I pray for SCM's vision and mission",
    },
    {
      value: "Dedicating time to prayer",
      label: "I serve by dedicating time to prayer",
    },
  ];
  const otherSupport = [
    {
      value: "Hiring staff for ministry",
      label:
        "Hiring of full-time or part-time staff who have a calling to minister",
    },
    {
      value: "Support indigenous missionaries",
      label: "Permanent support for indigenous missionaries",
    },
    {
      value: "Materials for music and media",
      label:
        "Various materials for music, media/audio-video studio, and printing works",
    },
  ];

  const handleCheckboxChangePrayer = (value: string, checked: boolean) => {
    if (checked) {
      updateFormData({
        ...formData,
        prayerSupport: [...formData.prayerSupport, value],
      });
    } else {
      updateFormData({
        ...formData,
        prayerSupport: formData.prayerSupport.filter((item) => item !== value),
      });
    }
  };
  const handleCheckboxChangeOther = (value: string, checked: boolean) => {
    if (checked) {
      updateFormData({
        ...formData,
        otherSupport: [...formData.otherSupport, value],
      });
    } else {
      updateFormData({
        ...formData,
        otherSupport: formData.otherSupport.filter((item) => item !== value),
      });
    }
  };

  return (
    <div className="space-y-6">
      <p className="mb-4 text-lg text-gray-600">
        Please indicate how you would like to contribute to our ministry:
      </p>
      <p className="mb-3 text-lg text-gray-400">Prayer Support</p>
      <div className="space-y-5">
        {prayerSupport.map((option, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Checkbox
              id={`prayer-${index}`}
              checked={formData.prayerSupport.includes(option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChangePrayer(option.value, checked as boolean)
              }
              className="mt-1"
            />
            <Label
              htmlFor={`prayer-${index}`}
              className="cursor-pointer text-base text-gray-700"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
      <p className="mb-3 text-lg text-gray-400">Other Support</p>
      <div className="space-y-5">
        {otherSupport.map((option, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Checkbox
              id={`other-${index}`}
              checked={formData.otherSupport.includes(option.value)}
              onCheckedChange={(checked) =>
                handleCheckboxChangeOther(option.value, checked as boolean)
              }
              className="mt-1"
            />
            <Label
              htmlFor={`other-${index}`}
              className="cursor-pointer text-base text-gray-700"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
