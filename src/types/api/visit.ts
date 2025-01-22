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
  
  creatorId: number;
  creatorName: string;

  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type VisitBase = {
  customerId: number;
}
export type CreateVisitRequest = VisitBase;

export type UpdateVisitRequest = Partial<VisitBase>; 