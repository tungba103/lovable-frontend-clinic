import { ServiceCategory } from "./serviceCategory";

export interface Service {
  id: number;
  code: string;
  name: string;
  serviceCategoryId: number;
  price: number;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  serviceCategory: ServiceCategory;
}

export type ServiceBase = Omit<Service, 'id' | 'code' | 'serviceCategory' | 'isActive' | 'createdAt' | 'updatedAt'>;

export type CreateServiceRequest = ServiceBase;

export type UpdateServiceRequest = Partial<ServiceBase>; 