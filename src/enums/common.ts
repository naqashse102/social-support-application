export const GenderEnum = {
  MALE: "MALE",
  FEMALE: "FEMALE",
  OTHER: "OTHER",
} as const;


export const MaritalStatusEnum = {
  SINGLE: "SINGLE",
  MARRIED: "MARRIED",
  DIVORCED: "DIVORCED",
  WIDOWED: "WIDOWED",
} as const;

export const EmploymentStatusEnum = {
  EMPLOYED: "EMPLOYED",
  SELF_EMPLOYED: "SELF_EMPLOYED",
  UNEMPLOYED: "UNEMPLOYED",
  STUDENT: "STUDENT",
  RETIRED: "RETIRED",
} as const;

export const HousingStatusEnum = {
  RENTED: "RENTED",
  OWNED: "OWNED",
  COMPANY_PROVIDED: "COMPANY_PROVIDED",
  LIVING_WITH_FAMILY: "LIVING_WITH_FAMILY",
} as const;