import { useFormContext } from "react-hook-form";
import Textarea from "../common/textarea";
import HelpMeWriteButton from "./help-me-write-button";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "../../utils/util";
import * as storage from '../../utils/local-storage';

const SituationDetails = () => {
  const { t } = useTranslation();
  const { control, setValue, watch , getValues} = useFormContext();

  const fields = useMemo(() => [
    {
      id: "financialSituation",
      label: t("situation.fields.financial.label", "Current Financial Situation"),
      helper: t("situation.fields.financial.helper", "Min 30 chars and maximum 500"),
    },
    {
      id: "employmentCircumstances",
      label: t("situation.fields.employment.label", "Employment Circumstances"),
      helper: t("situation.fields.employment.helper", "Min 30 chars and maximum 500"),
    },
    {
      id: "reasonForApplying",
      label: t("situation.fields.reason.label", "Reason for Applying"),
      helper: t("situation.fields.reason.helper", "Min 30 chars and maximum 500"),
    },
  ], [t]);

  const [financial, employment, reason] = watch(["financialSituation", "employmentCircumstances", "reasonForApplying"]);

  const handleAIAccept = (id: string, generatedText: string) => {
    setValue(id, generatedText, { shouldValidate: true });
  };

  const debouncedSave = useMemo(
    () =>
      debounce((data: any) => {
        storage.save(storage.formStorageKey, data);
      }, 1000),
    []
  );

  useEffect(() => {
    if (financial || employment || reason) {
      debouncedSave(getValues());
    }
  }, [financial, employment, reason, getValues, debouncedSave]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="border-b border-border pb-2">
        <h3 className="text-lg font-bold text-primary uppercase tracking-tight rtl:tracking-normal">
          {t("situation.title", "Situation Descriptions")}
        </h3>
        <p className="text-sm text-text-secondary">
          {t("situation.subtitle", "Explain your current situation to support your application.")}
        </p>
      </div>

      <div className="space-y-8">
        {fields.map((field) => (
          <div key={field.id} className="relative group">
            <Textarea
              name={field.id}
              control={control}
              label={field.label}
              placeholder={t("situation.common.placeholder", "Please provide details here...")}
              hintText={field.helper}
              required
            />

            <div className="flex justify-end -mt-5">
              <HelpMeWriteButton
                fieldId={field.id}
                currentValue={watch(field.id)}
                onAccept={(val) => handleAIAccept(field.id, val)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SituationDetails;