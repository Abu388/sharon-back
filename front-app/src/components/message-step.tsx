import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FormMessage } from "@/components/ui/form"

interface MessageStepProps {
  formData: {
    message: string
  }
  updateFormData: (data: Partial<{ message: string }>) => void
}

export default function MessageStep({ formData, updateFormData }: MessageStepProps) {
  const [errors, setErrors] = useState({
    message: "",
  })

  const handleBlur = () => {
    const newErrors = { ...errors }

    if (!formData.message) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    } else {
      newErrors.message = ""
    }

    setErrors(newErrors)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">
          Your Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => updateFormData({ message: e.target.value })}
          onBlur={handleBlur}
          placeholder="Please enter your message or inquiry"
          className="min-h-[150px]"
          required
        />
        {errors.message && <FormMessage>{errors.message}</FormMessage>}
      </div>
      <p className="text-sm text-muted-foreground">
        Please provide any additional information or questions you may have.
      </p>
    </div>
  )
}
