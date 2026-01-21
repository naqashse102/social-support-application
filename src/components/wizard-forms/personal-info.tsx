import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Select from "../common/select";
import DatePicker from "../common/date-picker";
import PhoneInput from "../common/phone";
import Input from "../common/input";
import { COUNTRY_STATES, CITIES, COUNTRIES } from "../../utils/constants";
import { GenderEnum } from "../../enums/common";
import Textarea from "../common/textarea";
import { formatEnum } from "../../utils/util";

const PersonalInformation = () => {
  const { t } = useTranslation();
  const { control, watch, setValue } = useFormContext();

  const [selectedCountry, selectedState] = watch(["country", "state"]);

  const prevCountryRef = useRef<string | undefined>(undefined);
  const prevStateRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (prevCountryRef.current && prevCountryRef.current !== selectedCountry) {
      setValue("state", undefined);
      setValue("city", undefined);
    }
    prevCountryRef.current = selectedCountry;
  }, [selectedCountry, setValue]);

  useEffect(() => {
    if (prevStateRef.current && prevStateRef.current !== selectedState) {
      setValue("city", undefined);
    }
    prevStateRef.current = selectedState;
  }, [selectedState, setValue]);

  const stateOptions = useMemo(() => {
    if (!selectedCountry) return [];
    return COUNTRY_STATES[selectedCountry as keyof typeof COUNTRY_STATES] ?? [];
  }, [selectedCountry]);

  const cityOptions = useMemo(() => {
    if (!selectedState) return [];
    return CITIES[selectedState as keyof typeof CITIES] ?? [];
  }, [selectedState]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="border-b border-border pb-4">
        <h3 className="text-lg font-bold text-primary uppercase tracking-tight rtl:tracking-normal">
          {t("personal.title", "Personal Information")}
        </h3>
        <p className="text-sm text-text-secondary">
          {t("personal.subtitle", "Please provide your identity and contact details as they appear on your Emirates ID.")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <Input
          name="name"
          control={control}
          label={t("personal.fields.name.label", "Full Name")}
          placeholder={t("personal.fields.name.placeholder", "As per Identity Card")}
          required
        />
        <Input
          name="nationalId"
          control={control}
          label={t("personal.fields.nationalId.label", "National ID")}
          placeholder="784-XXXX-XXXXXXX-X" 
          required
        />

        <DatePicker
          name="dob"
          control={control}
          label={t("personal.fields.dob.label", "Date of Birth")}
          required
        />
        
        <Select
          name="gender"
          control={control}
          label={t("personal.fields.gender.label", "Gender")}
          options={formatEnum(GenderEnum)} 
          placeholder={t("personal.fields.gender.placeholder", "Select gender")}
          required
        />

        <Select
          name="country"
          control={control}
          label={t("personal.fields.country.label", "Country")}
          options={COUNTRIES} 
          placeholder={t("personal.fields.country.placeholder", "Select Country")}
          required
        />

        <Select
          name="state"
          control={control}
          label={t("personal.fields.state.label", "State / Emirate")}
          options={stateOptions}
          placeholder={
            selectedCountry 
              ? t("personal.fields.state.placeholder_active", "Select State") 
              : t("personal.fields.state.placeholder_inactive", "Select Country First")
          }
          disabled={!selectedCountry}
          required
        />

        <Select
          name="city"
          control={control}
          label={t("personal.fields.city.label", "City")}
          options={cityOptions}
          placeholder={
            selectedState 
              ? t("personal.fields.city.placeholder_active", "Select City") 
              : t("personal.fields.city.placeholder_inactive", "Select State First")
          }
          disabled={!selectedState}
          required
        />

        <PhoneInput
          name="phone"
          control={control}
          label={t("personal.fields.phone.label", "Phone Number")}
          required
        />
        
        <div className="md:col-span-2">
          <Input
            name="email"
            control={control}
            label={t("personal.fields.email.label", "Email Address")}
            type="email"
            placeholder="example@domain.com"
            required
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            name="address"
            control={control}
            label={t("personal.fields.address.label", "Residential Address")}
            placeholder={t("personal.fields.address.placeholder", "Building, Street, Area")}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;