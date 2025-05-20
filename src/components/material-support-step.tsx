import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface MaterialSupportStepProps {
  formData: {
    materials: Array<{ type: string; quantity: string }>
    message: string
  }
  updateFormData: (data: Partial<MaterialSupportStepProps["formData"]>) => void
}

export default function MaterialSupportStep({ formData, updateFormData }: MaterialSupportStepProps) {
  const handleMaterialChange = (index: number, field: "type" | "quantity", value: string) => {
    const updatedMaterials = [...formData.materials]
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value,
    }
    updateFormData({ materials: updatedMaterials })
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-gray-600 text-lg mb-6">
          Please specify the types and quantities of materials you can provide:
        </p>

        <div className="space-y-6">
          {formData.materials.map((material, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`materialType-${index}`} className="text-gray-700 text-base">
                  Material Type {index + 1}
                </Label>
                <Input
                  id={`materialType-${index}`}
                  value={material.type}
                  onChange={(e) => handleMaterialChange(index, "type", e.target.value)}
                  placeholder="Enter material type"
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`materialQuantity-${index}`} className="text-gray-700 text-base">
                  Quantity
                </Label>
                <Input
                  id={`materialQuantity-${index}`}
                  value={material.quantity}
                  onChange={(e) => handleMaterialChange(index, "quantity", e.target.value)}
                  placeholder="Enter quantity"
                  className="h-12 text-base"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-gray-700 text-base">
          Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => updateFormData({ message: e.target.value })}
          placeholder="Write your message here"
          required
          className="min-h-[150px] text-base p-4"
        />
      </div>
    </div>
  )
}
