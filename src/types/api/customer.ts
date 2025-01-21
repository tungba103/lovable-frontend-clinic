export interface Customer {
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  parentName: string;
  parentPhone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CustomerBase = Omit<Customer, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>;

export type CreateCustomerRequest = CustomerBase;

export type UpdateCustomerRequest = Partial<CustomerBase>;
