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
  totalDiscount: number;
  
  creatorId: number;
  creatorName: string;

  diagnosis: string;
  symptoms: string;
  personalMedicalHistory: string;
  reExaminationTime: string;
  advice: string;

  prescription: Prescription;
  serviceUsage: ServiceUsage;

  countByCustomer: number;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  totalAmount: number;
  totalDiscount: number;
  prescriptionItems: PrescriptionItem[];
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
  usageInstructions: string;
  doctorNotes: string;
}

export interface ServiceUsage {
  totalAmount: number;
  totalDiscount: number;
  serviceUsageItems: ServiceUsageItem[];
}

export interface ServiceUsageItem {
  serviceId: number;
  serviceName: string;
  quantity: number;
  price: number;
  discount: number;
}

export type VisitBase = {
  customerId: number;
}
export type CreateVisitRequest = VisitBase;

export type UpdateVisitRequest = Partial<Visit>; 