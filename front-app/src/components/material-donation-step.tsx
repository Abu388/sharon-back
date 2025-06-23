import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";

interface MaterialDonationStepProps {
  formData: {
    materials: { name: string; quantity: number }[];
    message: string;
  };
  updateFormData: (
    data: Partial<{
      materials: { name: string; quantity: number }[];
      message: string;
    }>,
  ) => void;
}

const MaterialDonationStep: React.FC<MaterialDonationStepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleAddMaterial = () => {
    updateFormData({
      materials: [...formData.materials, { name: "", quantity: 1 }],
    });
  };

  const handleMessageChange = (field: string) => {
    updateFormData({ message: field });
  };

  const handleMaterialChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value };
    updateFormData({ materials: updatedMaterials });
  };

  return (
    <div>
      <h3 className="mb-4 text-xl">Donate Materials</h3>
      <p className="mb-8 text-sm text-neutral-400">Add materials bellow</p>
      {formData.materials.map((material, index) => (
        <div key={index} className="mb-4">
          <Input
            type="text"
            placeholder="Material Name"
            value={material.name}
            onChange={(e) =>
              handleMaterialChange(index, "name", e.target.value)
            }
            className="mb-2"
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={material.quantity}
            onChange={(e) =>
              handleMaterialChange(index, "quantity", Number(e.target.value))
            }
            className="mb-2"
          />
        </div>
      ))}
      <Button
        onClick={handleAddMaterial}
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        Add Material
      </Button>
      <div className="mt-12 flex flex-col gap-3">
        <label htmlFor="message" className="text-xl">
          Message
        </label>
        <Textarea
          placeholder="Message"
          id="message"
          value={formData.message}
          rows={30}
          onChange={(e) => handleMessageChange(e.target.value)}
          className="h-40"
        />
      </div>
    </div>
  );
};

export default MaterialDonationStep;
