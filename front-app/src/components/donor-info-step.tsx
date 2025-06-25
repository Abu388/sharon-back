import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DonorInfoStepProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    address: string;
  };
  updateFormData: (data: Partial<DonorInfoStepProps["formData"]>) => void;
}

export default function DonorInfoStep({
  formData,
  updateFormData,
}: DonorInfoStepProps) {
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleBlur = (field: keyof typeof errors) => {
    const newErrors = { ...errors };

    if (field === "fullName" && !formData.fullName) {
      newErrors.fullName = "Full name is required";
    } else if (field === "fullName") {
      newErrors.fullName = "";
    }

    if (field === "phoneNumber" && !formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (field === "phoneNumber") {
      newErrors.phoneNumber = "";
    }

    if (field === "email") {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      } else {
        newErrors.email = "";
      }
    }
    if (field === "address" && !formData["address"]) {
      newErrors.address = "Address is required";
    } else if (field === "address") {
      newErrors.address = "";
    }

    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base text-gray-700">
            Full Name
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            onBlur={() => handleBlur("fullName")}
            placeholder="Abebe Bekele"
            required
            className="h-12 text-base"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-base text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            onBlur={() => handleBlur("phoneNumber")}
            placeholder="+251912345678"
            required
            className="h-12 text-base"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder="example@gmail.com"
            required
            className="h-12 text-base"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="address" className="text-base text-gray-700">
            Address
          </Label>
          <Input
            id="address"
            type="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            onBlur={() => handleBlur("address")}
            placeholder="Addis Ababa, Ethiopia"
            required
            className="h-12 text-base"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
}
