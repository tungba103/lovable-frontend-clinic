export interface ServiceCategory {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ServiceCategoryBase = Omit<ServiceCategory, 'id' | 'code' | 'isActive' | 'createdAt' | 'updatedAt'>;

export type CreateServiceCategoryRequest = ServiceCategoryBase;

export type UpdateServiceCategoryRequest = Partial<ServiceCategoryBase>; 