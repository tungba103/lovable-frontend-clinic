import { ProductCategory } from "./productCategory";

export interface Product {
  id: number;
  code: string;
  name: string;
  productCategoryId: number;
  price: number;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  productCategory: ProductCategory;
}

export type ProductBase = Omit<Product, 'id' | 'code' | 'productCategory' | 'isActive' | 'createdAt' | 'updatedAt'>;

export type CreateProductRequest = ProductBase;

export type UpdateProductRequest = Partial<ProductBase>; 