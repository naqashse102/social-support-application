import type {
  EmploymentStatus,
  Gender,
  HousingStatus,
  MaritalStatus,
} from "../types/common";

export interface StepperProps {
  activeStep: number;
  steps: {
    name: string;
    description: string;
  }[];
}

export interface WizardFormData {
  // Step 1
  name: string;
  nationalId: string;
  dob: string;
  gender: Gender;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;

  // Step 2
  maritalStatus: MaritalStatus;
  dependents: number;
  employmentStatus: EmploymentStatus;
  monthlyIncome: number;
  housingStatus: HousingStatus;

  // Step 3
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}
