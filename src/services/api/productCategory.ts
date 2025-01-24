import { BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateProductCategoryRequest, ProductCategory, UpdateProductCategoryRequest } from "@/types/api/productCategory";
import { QueryParam } from "@/hooks/useQueryString";

export const getListProductCategories = ({
  page,
  pageSize,
  search,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
}) => authApi<BaseListDataResponse<ProductCategory>>({
  method: 'GET',
  url: `/product-categories`,
  params: {
    page,
    pageSize,
    search,
  },
}); 

export const getProductCategory = (productCategoryId: number) => authApi<ProductCategory>({
  method: 'GET',
  url: `/product-categories/${productCategoryId}`,
});

export const createProductCategory = (data: CreateProductCategoryRequest) => authApi<ProductCategory>({
  method: 'POST',
  url: `/product-categories`,
  data,
});

export const updateProductCategory = (productCategoryId: number, data: UpdateProductCategoryRequest) => authApi<ProductCategory>({
  method: 'PATCH',
  url: `/product-categories/${productCategoryId}`,
  data,
});
