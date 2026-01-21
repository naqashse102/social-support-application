import type { WizardFormType } from "../validations/wizard-form";

const STEP_FIELDS: Record<number, (keyof WizardFormType)[]> = {
  1: [
    "name",
    "nationalId",
    "dob",
    "gender",
    "address",
    "city",
    "state",
    "country",
    "phone",
    "email",
  ],
  2: [
    "maritalStatus",
    "dependents",
    "employmentStatus",
    "monthlyIncome",
    "housingStatus",
  ],
  3: ["financialSituation", "employmentCircumstances", "reasonForApplying"],
};

const FIELD_PROMPTS: Record<string, { system: string; userPrefix: string , title: string}> = {
  financialSituation: {
    system: `You are a social support advisor. Help the user describe their financial hardship professionally, factually, and clearly. Focus on income gaps, rising costs, or lack of savings if relevant. Use formal, sincere language. Keep the response ≤400 characters. Avoid placeholders like '[Name]' or generic phrases. Example: "Due to recent medical bills and reduced work hours, I struggle to cover essential expenses for my family."`,
    userPrefix: "Describe my financial hardship based on this: ",
    title: 'Financial Situtation'
  },
  employmentCircumstances: {
    system: `You are a professional career counselor. Help the user explain their current employment situation (e.g., job loss, reduced hours, or inability to work) in a clear and professional way. Focus on the impact on their livelihood. Keep the response ≤400 characters. Use formal language and avoid placeholders or generic phrases. Example: "I was furloughed last month and currently work reduced hours, affecting my ability to cover living expenses."`,
    userPrefix: "Explain my employment situation based on this: ",
    title: 'Employment Circumstances'
  },
  reasonForApplying: {
    system: `You are a social worker. Help the user articulate why they are seeking government assistance at this time. Emphasize immediate needs and desired outcomes for family stability. Keep the response ≤400 characters, formal, sincere, and factual. Avoid placeholders or vague statements. Example: "I am applying for support due to unexpected medical expenses and reduced household income, which threatens my family's basic needs."`,
    userPrefix: "Draft a reason for my application based on this: ",
    title: 'Applying Reason'
  },
};

const COUNTRY_CODES = [
  { code: "+966", iso: "SA", label: "🇸🇦 +966" },
  { code: "+971", iso: "AE", label: "🇦🇪 +971" },
];

// Countries
const COUNTRIES = [
  { label: "United Arab Emirates", value: "AE" },
  { label: "Saudi Arabia", value: "SA" },
];

// States per country
const COUNTRY_STATES = {
  AE: [
    { label: "Abu Dhabi", value: "AUH" },
    { label: "Dubai", value: "DXB" },
    { label: "Sharjah", value: "SHJ" },
    { label: "Ajman", value: "AJM" },
    { label: "Umm Al Quwain", value: "UAQ" },
    { label: "Ras Al Khaimah", value: "RAK" },
    { label: "Fujairah", value: "FJR" },
  ],
  SA: [
    { label: "Riyadh", value: "RUH" },
    { label: "Makkah", value: "MAK" },
    { label: "Madinah", value: "MED" },
    { label: "Qassim", value: "QAS" },
    { label: "Eastern Province", value: "EAS" },
    { label: "Asir", value: "ASR" },
    { label: "Tabuk", value: "TAB" },
    { label: "Hail", value: "HAIL" },
    { label: "Northern Borders", value: "NBR" },
    { label: "Jizan", value: "JIZ" },
    { label: "Najran", value: "NAJ" },
    { label: "Al Bahah", value: "BAH" },
    { label: "Al Jawf", value: "JWF" },
  ],
};

// Cities per state
const CITIES = {
  // UAE
  AUH: [
    { label: "Abu Dhabi", value: "AUH" },
    { label: "Al Ain", value: "ALN" },
    { label: "Mussafah", value: "MUS" },
  ],
  DXB: [
    { label: "Dubai", value: "DXB" },
    { label: "Jebel Ali", value: "JEB" },
  ],
  SHJ: [
    { label: "Sharjah", value: "SHJ" },
    { label: "Kalba", value: "KAL" },
  ],
  AJM: [{ label: "Ajman", value: "AJM" }],
  UAQ: [{ label: "Umm Al Quwain", value: "UAQ" }],
  RAK: [{ label: "Ras Al Khaimah", value: "RAK" }],
  FJR: [{ label: "Fujairah", value: "FJR" }],

  // Saudi Arabia
  RUH: [
    { label: "Riyadh", value: "RUH" },
    { label: "Buraydah", value: "BHR" },
  ],
  MAK: [
    { label: "Jeddah", value: "JED" },
    { label: "Mecca", value: "MEC" },
    { label: "Taif", value: "TAI" },
  ],
  MED: [
    { label: "Medina", value: "MED" },
    { label: "Yanbu", value: "YNB" },
  ],
  QAS: [
    { label: "Buraidah", value: "BHA" },
    { label: "Unaizah", value: "UNA" },
  ],
  EAS: [
    { label: "Dammam", value: "DMM" },
    { label: "Khobar", value: "KHO" },
    { label: "Dhahran", value: "DHA" },
  ],
  ASR: [
    { label: "Abha", value: "ABH" },
    { label: "Khamis Mushait", value: "KHM" },
  ],
  TAB: [{ label: "Tabuk", value: "TAB" }],
  HAIL: [{ label: "Hail", value: "HAIL" }],
  NBR: [{ label: "Arar", value: "ARAR" }],
  JIZ: [{ label: "Jizan", value: "JZN" }],
  NAJ: [{ label: "Najran", value: "NAJ" }],
  BAH: [{ label: "Al Bahah", value: "BHH" }],
  JWF: [{ label: "Al Jawf", value: "AJF" }],
};

export {
  STEP_FIELDS,
  COUNTRY_CODES,
  COUNTRIES,
  CITIES,
  COUNTRY_STATES,
  FIELD_PROMPTS,
};
