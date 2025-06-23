import React from "react";

interface JoinUsReviewStepProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    country: string;
    church: string;
    office: string;
    partnerWays: string[];
    professionalSupport: string[];
    otherExpertise: string;
  };
}

const JoinUsReviewStep: React.FC<JoinUsReviewStepProps> = ({ formData }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-medium text-gray-800">
          Review Your Information
        </h3>
        <p className="mt-2 text-gray-600">
          Please review your information before submitting.
        </p>
      </div>

      {/* Personal Information */}
      <div className="space-y-2">
        <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
          Personal Information
        </h4>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 pt-2 md:grid-cols-2">
          <div>
            <span className="text-gray-500">Full Name:</span>
            <p className="font-medium text-gray-800">{formData.fullName}</p>
          </div>

          <div>
            <span className="text-gray-500">Phone:</span>
            <p className="font-medium text-gray-800">{formData.phone}</p>
          </div>

          <div>
            <span className="text-gray-500">Email:</span>
            <p className="font-medium text-gray-800">{formData.email}</p>
          </div>

          {formData.address && (
            <div>
              <span className="text-gray-500">Address:</span>
              <p className="font-medium text-gray-800">{formData.address}</p>
            </div>
          )}

          {formData.country && (
            <div>
              <span className="text-gray-500">Country:</span>
              <p className="font-medium text-gray-800">{formData.country}</p>
            </div>
          )}

          {formData.church && (
            <div>
              <span className="text-gray-500">Church:</span>
              <p className="font-medium text-gray-800">{formData.church}</p>
            </div>
          )}

          {formData.office && (
            <div>
              <span className="text-gray-500">Office:</span>
              <p className="font-medium text-gray-800">{formData.office}</p>
            </div>
          )}
        </div>
      </div>

      {/* Ways to Partner */}
      {formData.partnerWays.length > 0 && (
        <div className="space-y-2">
          <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
            Ways to Partner
          </h4>
          <ul className="list-disc space-y-1 pt-2 pl-5">
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
          <h4 className="border-b pb-2 text-lg font-medium text-gray-700">
            Professional Support
          </h4>
          <div className="pt-2">
            {formData.professionalSupport.length > 0 && (
              <ul className="list-disc space-y-1 pl-5">
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
                <p className="font-medium text-gray-800">
                  {formData.otherExpertise}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinUsReviewStep;
