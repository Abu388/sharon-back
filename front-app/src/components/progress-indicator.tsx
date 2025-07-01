interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <div className="w-full mt-6">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? "bg-blue-600 text-white"
                  : step < currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
            >
              {step}
            </div>
            <span className="text-xs mt-1 hidden sm:block">
              {step === 1 && "Personal"}
              {step === 2 && "Partnership"}
              {step === 3 && "Professional"}
              {step === 4 && "Material"}
              {step === 5 && "Review"}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
