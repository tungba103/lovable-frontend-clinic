import { Customer } from "./customer";

export enum VisitStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Visit {
  id: number;
  customer: Customer;
  status: VisitStatus;
  totalAmount: number;
  
  creatorId: number;
  creatorName: string;

  diagnosis: string;
  symptoms: string;
  personalMedicalHistory: string;
  familyMedicalHistory: string;
  reExaminationTime: string;
  advice: string;

  prescription: Prescription;
  serviceUsage: ServiceUsage;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  totalAmount: number;
  totalDiscount: number;
  PrescriptionItem: PrescriptionItem[];
}

export interface PrescriptionItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  morningDosage: number;
  noonDosage: number;
  afternoonDosage: number;
  eveningDosage: number;
}

export interface ServiceUsage {
  totalAmount: number;
  totalDiscount: number;
  ServiceUsageItem: ServiceUsageItem[];
}

export interface ServiceUsageItem {
  serviceId: number;
  quantity: number;
  price: number;
  discount: number;
}

export type VisitBase = {
  customerId: number;
}
export type CreateVisitRequest = VisitBase;

export type UpdateVisitRequest = Partial<Visit>; 