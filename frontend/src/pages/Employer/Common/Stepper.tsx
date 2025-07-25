import React from "react";

interface StepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep, className }) => {
  // If steps length is 4, add 'JobPreview' as 5th step
  const displaySteps = steps.length === 4 ? [...steps, "JobPreview"] : steps;
  return (
    <div className={`w-full flex items-center justify-between ${className || ''}`}>
      {displaySteps.map((label, idx) => (
        <React.Fragment key={label + idx}>
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full flex items-center justify-center font-semibold shadow w-10 h-10 text-lg transition-all duration-200 ${
                idx === activeStep
                  ? 'bg-[#fbb040] text-white scale-110 border-4 border-[#fbb040]' // active
                  : 'bg-[#E5E7EB] text-[#253858] border-2 border-[#fbb040]'
              }`}
            >
              {idx + 1}
            </div>
            <span
              className={`text-xs mt-2 font-semibold transition-all duration-200 ${
                idx === activeStep ? 'text-[#fbb040]' : 'text-[#42526E]'
              }`}
            >
              {label}
            </span>
          </div>
          {idx < displaySteps.length - 1 && (
            <div className="flex-1 h-1 mx-2 bg-gradient-to-r from-[#fbb040] to-[#E5E7EB] rounded-full" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
