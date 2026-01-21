import {
  EmploymentStatusEnum,
  GenderEnum,
  HousingStatusEnum,
  MaritalStatusEnum,
} from "../enums/common";

export type LoaderContextType = {
  showLoader: () => void;
  hideLoader: () => void;
};

export type Gender = (typeof GenderEnum)[keyof typeof GenderEnum];
export type MaritalStatus = (typeof MaritalStatusEnum)[keyof typeof MaritalStatusEnum];
export type EmploymentStatus =
  (typeof EmploymentStatusEnum)[keyof typeof EmploymentStatusEnum];
export type HousingStatus =
  (typeof HousingStatusEnum)[keyof typeof HousingStatusEnum];
