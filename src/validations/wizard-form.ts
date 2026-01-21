import { z } from "zod";
import {
  EmploymentStatusEnum,
  GenderEnum,
  HousingStatusEnum,
  MaritalStatusEnum,
} from "../enums/common";
import { EMIRATES_ID_REGEX, UAE_PHONE_REGEX } from "../utils/regex";
import { isAdult } from "../utils/util";

export type WizardFormType = z.infer<typeof wizardSchema>;

const wizardSchema = z.object({
  // Step 1
  name: z.string("Name is required").min(3, "Full name must be at least 3 characters"),
  // Format 784-XXXX-XXXXXXX-X
  nationalId: z
    .string("National ID number is required")
    .regex(
      EMIRATES_ID_REGEX,
      "Invalid Emirates ID format (e.g., 784-1980-1234567-1)",
    ),
  dob: z
    .string('Date of birth is required')
    .refine((date) => !isNaN(Date.parse(date)), "Please select date")
    .refine((date) => new Date(date) < new Date(), {
      message: "Date of birth must be in the past",
    })
    .refine((date) => isAdult(date), {
      message: "You must be at least 18 years old to apply",
    }),
  gender: z.enum(GenderEnum, {
    error: "Please select a gender",
  }),
  // Supports +9715... or 05...
  phone: z
    .string('Phone is required')
    .regex(UAE_PHONE_REGEX, "Please enter a valid UAE or Saudi mobile number (example: 0501234567)"),
  email: z.email("Invalid email address"),
  address: z.string('Address is required').min(5, "Please enter your street/building details"),
  city: z.string('Please select city').min(1, 'Please select city'),
  state: z.string('Please select state').min(1, 'Please select state'),
  country: z.string('Please select country'),
  // Step 2
  maritalStatus: z.enum(MaritalStatusEnum, {
    error: "Please select a marital status",
  }),
  dependents: z.coerce
    .number("Dependents must be a number")
    .int('Must be a whole number')
    .min(0, "Dependents cannot be negative")
    .max(20, "Too many dependents"),
  employmentStatus: z.enum(EmploymentStatusEnum, {
    error: "Please select a employment status",
  }),
  monthlyIncome: z.coerce
    .number({
      message: "Monthly income must be a number",
    })
    .min(0, "Income cannot be negative"),
  housingStatus: z.enum(HousingStatusEnum, {
    error: "Please select a housing status",
  }),
  financialSituation: z
    .string("Financial situation is required")
    .min(30, "Please provide at least 30 characters")
    .max(500, "Length exceed the 500 characters limit"),
  employmentCircumstances: z
    .string("Employment circumstances are required")
    .min(30, "Please provide at least 30 characters")
    .max(500, "Length exceed the 500 characters limit"),
  reasonForApplying: z
    .string("Reason for applying is required")
    .min(30, "Please provide at least 30 characters")
    .max(500, "Length exceed the 500 characters limit"),
});

export { wizardSchema }
