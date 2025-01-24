export interface ProductCategory {
  id: number;
  code: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
} 

export type ProductCategoryBase = Omit<ProductCategory, 'id' | 'code' | 'isActive' | 'createdAt' | 'updatedAt'>;

export type CreateProductCategoryRequest = ProductCategoryBase;

export type UpdateProductCategoryRequest = Partial<ProductCategoryBase>;