import { Check } from "lucide-react";
import { memo } from "react";
import type { StepperProps } from "../interfaces/common";

const Stepper = memo(({ steps, activeStep }: StepperProps) => {
  return (
    <nav
      aria-label="Progress"
      className="bg-background"
    >
      <ol
        role="list"
        className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-s lg:border-e lg:border-border"
      >
        {steps.map((step, stepIdx) => {
          const stepNum = stepIdx + 1;
          const isComplete = activeStep > stepNum;
          const isActive = activeStep === stepNum;
          const isFirstStep = stepIdx === 0;

          return (
            <li key={stepIdx} className="relative overflow-hidden lg:flex-1">
              <div
                className={`
                  ${stepIdx === 0 ? "rounded-t-md border-b-0" : ""} 
                  ${stepIdx === steps.length - 1 ? "rounded-b-md border-t-0" : ""} 
                  border border-border lg:border-0
                `}
              >
                <div className="group relative">
                  <span
                    className={`absolute w-full bottom-0 lg:top-auto h-1 transition-colors duration-200 z-31 
                      ${isActive ? "bg-primary" : "bg-transparent group-hover:bg-muted"}
                    `}
                    aria-hidden="true"
                  />

                  {!isFirstStep && (
                    <div
                      className="absolute inset-y-0 hidden w-3 lg:block z-30 ltr:left-0 rtl:right-0"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-border bg-background rtl:rotate-180"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentColor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  )}

                  <span className="flex items-start px-6 py-5 text-sm font-medium relative z-20">
                    <span className="shrink-0">
                      {isComplete ? (
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                          <Check className="h-6 w-6" strokeWidth={3} />
                        </span>
                      ) : (
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors
                          ${isActive ? "border-primary text-primary" : "border-border text-text-muted"}
                        `}
                        >
                          <span className="text-lg font-bold">{stepNum}</span>
                        </span>
                      )}
                    </span>

                    <span className="ms-4 mt-0.5 flex min-w-0 flex-col text-start">
                      <span
                        className={`text-lg font-bold tracking-wide transition-colors rtl:tracking-normal
                        ${isActive ? "text-primary" : isComplete ? "text-text" : "text-text-muted"}
                      `}
                      >
                        {step.name}
                      </span>
                      <span className="text-sm font-medium text-text-secondary leading-tight">
                        {step.description}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
});

export default Stepper;