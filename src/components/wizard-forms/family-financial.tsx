import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select from "../common/select";
import {
  EmploymentStatusEnum,
  HousingStatusEnum,
  MaritalStatusEnum,
} from "../../enums/common";
import Input from "../common/input";
import { formatEnum } from "../../utils/util";

const FamilyFinancial = () => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="border-b border-border pb-2">
        <h3 className="text-lg font-bold text-primary uppercase tracking-tight rtl:tracking-normal">
          {t("financial.title", "Financial & Family Status")}
        </h3>
        <p className="text-sm text-text-secondary">
          {t("financial.subtitle", "This information helps us determine your eligibility for support.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <Select
          name="maritalStatus"
          control={control}
          label={t("financial.fields.maritalStatus.label", "Marital Status")}
          options={formatEnum(MaritalStatusEnum)}
          placeholder={t("financial.fields.maritalStatus.placeholder", "Choose status...")}
          required
        />

        <Input
          name="dependents"
          control={control}
          label={t("financial.fields.dependents.label", "Number of Dependents")}
          type="number"
          placeholder={t("financial.fields.dependents.placeholder", "e.g. 2")}
          required
        />

        <Select
          name="employmentStatus"
          control={control}
          label={t("financial.fields.employmentStatus.label", "Employment Status")}
          options={formatEnum(EmploymentStatusEnum)}
          placeholder={t("financial.fields.employmentStatus.placeholder", "Choose status...")}
          required
        />

        <Input
          name="monthlyIncome"
          control={control}
          label={t("financial.fields.monthlyIncome.label", "Monthly Income (AED)")}
          type="number"
          placeholder={t("financial.fields.monthlyIncome.placeholder", "e.g. 15000")}
          required
        />

        <Select
          name="housingStatus"
          control={control}
          label={t("financial.fields.housingStatus.label", "Housing Status")}
          options={formatEnum(HousingStatusEnum)}
          placeholder={t("financial.fields.housingStatus.placeholder", "Select housing type...")}
          required
        />
      </div>

      <div className="bg-muted p-4 rounded-md border-s-4 border-primary">
        <p className="text-xs text-text-secondary leading-relaxed">
          <span className="font-bold text-text uppercase block mb-1">
            {t("financial.note.title", "Note:")}
          </span>
          {t("financial.note.text", "Please ensure your monthly income is correct. You may be asked to few supporting questions in the next stage.")}
        </p>
      </div>
    </div>
  );
};

export default FamilyFinancial;