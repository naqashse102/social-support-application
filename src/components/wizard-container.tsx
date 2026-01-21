import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { STEP_FIELDS } from "../utils/constants";
import * as storage from "../utils/local-storage";
import { wizardSchema, type WizardFormType } from "../validations/wizard-form";
import Button from "./common/button";
import FamilyFinancial from "./wizard-forms/family-financial";
import PersonalInformation from "./wizard-forms/personal-info";
import SituationDetails from "./wizard-forms/situation-details";
import SuccessModal from "./wizard-forms/success-modal";
import { useLoader } from "../contexts/app-loader";
import Stepper from "./stepper";

const WizardContainer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  const { showLoader, hideLoader } = useLoader()
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState<boolean>(false);

  // Form Hook
  const methods = useForm<WizardFormType>({
    mode: "onBlur",
    resolver: zodResolver(wizardSchema) as unknown as Resolver<WizardFormType>,
    defaultValues: {
      dependents: 0,
      monthlyIncome: 0,
    },
  });
  const { reset, trigger, getValues, handleSubmit } = methods;

  // Stepper Steps
  const steps = useMemo(
    () => [
      {
        name: t("wizard.steps.personal.name", "Personal Information"),
        description: t("wizard.steps.personal.desc", "Enter your ID & contact"),
        component: <PersonalInformation />,
      },
      {
        name: t("wizard.steps.financial.name", "Family & Financial"),
        description: t(
          "wizard.steps.financial.desc",
          "Check support eligibility",
        ),
        component: <FamilyFinancial />,
      },
      {
        name: t("wizard.steps.situation.name", "Situation Descriptions"),
        description: t("wizard.steps.situation.desc", "AI Assistance"),
        component: <SituationDetails />,
      },
    ],
    [t],
  );

  useEffect(() => {
    // Kepts the local storage util clean, can be scaled later with any data
    const data = storage.get(storage.formStorageKey);
    const activeStep = storage.get(storage.formActiveStepKey);

    data && reset(data);
    typeof activeStep === "number" &&
      activeStep > 0 &&
      setActiveStep(activeStep as number);
  }, [reset]);

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[activeStep];
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      const nextStep = activeStep + 1;
      // Store to persist data
      storage.save(storage.formStorageKey, getValues());
      storage.save(storage.formActiveStepKey, nextStep);

      // Updated the active step state
      setActiveStep(nextStep);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      const prevStep = activeStep - 1;
      storage.save(storage.formActiveStepKey, prevStep);

      // Updated the active step state
      setActiveStep(prevStep);
    }
  };

  const onSubmitHandler = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessModalIsOpen(true);
    }, 3000);
  };

  const handleKeyNavigation = useCallback(
    (e: KeyboardEvent) => {
      const isModalOpen = !!document.querySelector('[role="dialog"]');
      if (isModalOpen) return;
      
      const tagName = (e.target as HTMLElement).tagName;
      if (tagName === "TEXTAREA" || tagName === "SELECT" || tagName === "BUTTON") {
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (activeStep < 3) {
          handleNext();
        } else {
          handleSubmit(onSubmitHandler)();
        }
      }
    },
    [activeStep, handleNext, handleSubmit, onSubmitHandler],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNavigation);
    return () => window.removeEventListener("keydown", handleKeyNavigation);
  }, [handleKeyNavigation]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col w-[92%] max-w-7xl mx-auto my-auto bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden min-h-200">
        <div className="border-b border-gray-200">
          <Stepper activeStep={activeStep} steps={steps} />
        </div>

        <div className="flex-1 h-full p-8">
          {steps[activeStep - 1].component}
        </div>

        <div className="p-6 bg-surface border-t border-border flex items-center justify-end gap-3 mt-auto">
          {/* Previous Button */}
          <div className="min-w-30">
            {activeStep > 1 && (
              <Button
                type="button"
                styleType="outlined"
                variant="primary"
                onClick={handleBack}
                icon={
                  isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />
                }
                disabled={isLoading}
                iconPosition={isRtl ? "right" : "left"}
              >
                {t("wizard.navigation.back", "Back")}
              </Button>
            )}
          </div>

          {/* Next / Submit Button */}
          <div className="min-w-30">
            {activeStep < 3 ? (
              <Button
                type="button"
                styleType="filled"
                variant="primary"
                onClick={handleNext}
                icon={
                  isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />
                }
                iconPosition={isRtl ? "left" : "right"}
              >
                {t("wizard.navigation.next", "Next Step")}
              </Button>
            ) : (
              <Button
                type="button"
                styleType="filled"
                variant="accent"
                onClick={handleSubmit(onSubmitHandler)}
                icon={<Send size={18} className={isRtl ? "-rotate-90" : ""} />}
                iconPosition={isRtl ? "right" : "left"}
                isLoading={isLoading}
              >
                {t("wizard.navigation.submit", "Submit Application")}
              </Button>
            )}
          </div>
        </div>

        {successModalIsOpen && (
          <SuccessModal
            isOpen={successModalIsOpen}
            onClose={() => {
              showLoader()
              setSuccessModalIsOpen(false);
              setTimeout(() => {
                  reset({ dependents: 0, monthlyIncome: 0 });
                  storage.clear();
                  setActiveStep(1);
                  hideLoader()
              }, 4000);
            
            }}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default WizardContainer;
