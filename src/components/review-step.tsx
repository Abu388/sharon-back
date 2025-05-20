interface ReviewStepProps {
  formData: {
    // Personal Information
    fullName: string
    phone: string
    address: string
    email: string
    country: string
    church: string
    office: string

    // Ways to Partner
    partnerWays: string[]

    // Professional Support
    professionalSupport: string[]
    otherExpertise: string

    // Material Support
    materials: Array<{ type: string; quantity: string }>
    message: string
  }
}

export default function ReviewStep({ formData }: ReviewStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-gray-800">Review Your Information</h3>
        <p className="text-gray-600 mt-2">Please review your partnership information before submitting.</p>
      </div>

      {/* Personal Information */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Personal Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 pt-2">
          <div>
            <span className="text-gray-500">Full Name:</span>
            <p className="text-gray-800 font-medium">{formData.fullName}</p>
          </div>

          <div>
            <span className="text-gray-500">Phone:</span>
            <p className="text-gray-800 font-medium">{formData.phone}</p>
          </div>

          <div>
            <span className="text-gray-500">Email:</span>
            <p className="text-gray-800 font-medium">{formData.email}</p>
          </div>

          {formData.address && (
            <div>
              <span className="text-gray-500">Address:</span>
              <p className="text-gray-800 font-medium">{formData.address}</p>
            </div>
          )}

          {formData.country && (
            <div>
              <span className="text-gray-500">Country:</span>
              <p className="text-gray-800 font-medium">{formData.country}</p>
            </div>
          )}

          {formData.church && (
            <div>
              <span className="text-gray-500">Church:</span>
              <p className="text-gray-800 font-medium">{formData.church}</p>
            </div>
          )}

          {formData.office && (
            <div>
              <span className="text-gray-500">Office:</span>
              <p className="text-gray-800 font-medium">{formData.office}</p>
            </div>
          )}
        </div>
      </div>

      {/* Ways to Partner */}
      {formData.partnerWays.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Ways to Partner</h4>
          <ul className="list-disc pl-5 pt-2 space-y-1">
            {formData.partnerWays.map((way, index) => (
              <li key={index} className="text-gray-800">
                {way}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Professional Support */}
      {(formData.professionalSupport.length > 0 || formData.otherExpertise) && (
        <div className="space-y-2">
          <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Professional Support</h4>
          <div className="pt-2">
            {formData.professionalSupport.length > 0 && (
              <ul className="list-disc pl-5 space-y-1">
                {formData.professionalSupport.map((support, index) => (
                  <li key={index} className="text-gray-800">
                    {support}
                  </li>
                ))}
              </ul>
            )}
            {formData.otherExpertise && (
              <div className="mt-2">
                <span className="text-gray-500">Other expertise:</span>
                <p className="text-gray-800 font-medium">{formData.otherExpertise}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Material Support */}
      <div className="space-y-2">
        <h4 className="text-lg font-medium text-gray-700 border-b pb-2">Material Support</h4>
        <div className="pt-2">
          {formData.materials.some((m) => m.type || m.quantity) && (
            <div className="mb-4">
              <h5 className="text-gray-600 font-medium mb-2">Materials:</h5>
              {formData.materials.map((material, index) =>
                material.type || material.quantity ? (
                  <div key={index} className="mb-2">
                    {material.type && <span className="text-gray-800">Type: {material.type}</span>}
                    {material.type && material.quantity && <span> - </span>}
                    {material.quantity && <span className="text-gray-800">Quantity: {material.quantity}</span>}
                  </div>
                ) : null,
              )}
            </div>
          )}

          <div>
            <h5 className="text-gray-600 font-medium mb-2">Message:</h5>
            <p className="text-gray-800 whitespace-pre-wrap">{formData.message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
