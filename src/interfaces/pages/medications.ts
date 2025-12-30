export interface ISubstitutes {
  code?: string;
  display?: string;
  system?: string;
  brand?: string;
  isGeneric?: string;
}

export interface IDosage {
  _id: string;
  type?: string;
  value: string;
  treatmentIds: string[];
  substitutes?: ISubstitutes[];
}

export interface IMedicines {
  message: string;
  _id: string;
  categoryName: string;
  categoryCode: string;
  medicineName: string;
  description: string;
  medicineImageKey: string;
  dosage: IDosage[];
  footerNote?: Record<string, string>;
}
