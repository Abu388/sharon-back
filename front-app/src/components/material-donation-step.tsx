import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MaterialDonationStepProps {
  formData: {
    materials: { name: string; quantity: number; message: string }[];
  };
  updateFormData: (
    data: Partial<{
      materials: { name: string; quantity: number; message: string }[];
    }>,
  ) => void;
}

const MaterialDonationStep: React.FC<MaterialDonationStepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleAddMaterial = () => {
    updateFormData({
      materials: [
        ...formData.materials,
        { name: "", quantity: 1, message: "" },
      ],
    });
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
      <h3 className="mb-4 text-xl font-bold">Donate Materials</h3>
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
          <Input
            type="text"
            placeholder="Message"
            value={material.message}
            onChange={(e) =>
              handleMaterialChange(index, "message", e.target.value)
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
    </div>
  );
};

export default MaterialDonationStep;
