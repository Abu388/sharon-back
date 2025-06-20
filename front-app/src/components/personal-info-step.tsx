"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoStepProps {
  formData: {
    fullName: string;
    password: string;
    phone: string;
    address: string;
    email: string;
    country: string;
    church: string;
    office: string;
  };
  updateFormData: (data: Partial<PersonalInfoStepProps["formData"]>) => void;
}

export default function PersonalInfoStep({
  formData,
  updateFormData,
}: PersonalInfoStepProps) {
  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
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

    if (field === "phone" && !formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (field === "phone") {
      newErrors.phone = "";
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

    if (field === "password") {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      } else {
        newErrors.password = "";
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            onBlur={() => handleBlur("fullName")}
            placeholder="Enter your full name"
            required
            className="h-12 text-base"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base text-gray-700">
            Phone <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            onBlur={() => handleBlur("phone")}
            placeholder="Enter your phone number"
            required
            className="h-12 text-base"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            onBlur={() => handleBlur("email")}
            placeholder="Enter your email address"
            required
            className="h-12 text-base"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-base text-gray-700">
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            onBlur={() => handleBlur("password")}
            placeholder="Enter your password"
            required
            className="h-12 text-base"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-base text-gray-700">
            Address
          </Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            placeholder="Enter your address"
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-base text-gray-700">
            Country
          </Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => updateFormData({ country: e.target.value })}
            placeholder="Enter your country"
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="church" className="text-base text-gray-700">
            Church Where You Worship
          </Label>
          <Input
            id="church"
            value={formData.church}
            onChange={(e) => updateFormData({ church: e.target.value })}
            placeholder="Enter your church"
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="office" className="text-base text-gray-700">
            Office
          </Label>
          <Input
            id="office"
            value={formData.office}
            onChange={(e) => updateFormData({ office: e.target.value })}
            placeholder="Enter your office"
            className="h-12 text-base"
          />
        </div>
      </div>
    </div>
  );
}
