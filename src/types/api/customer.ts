export interface Customer {
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  birth_date?: string;
  parentName: string;
  parent_name?: string;
  parentPhone: string;
  parent_phone?: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  created_at?: string;
  updatedAt: string;
  updated_at?: string;
}

export type CustomerBase = Omit<Customer, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>;

export type CreateCustomerRequest = CustomerBase;

export type UpdateCustomerRequest = Partial<CustomerBase>;
