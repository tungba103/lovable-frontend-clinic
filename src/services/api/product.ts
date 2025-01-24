import { BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateProductRequest, Product, UpdateProductRequest } from "@/types/api/product";
import { QueryParam } from "@/hooks/useQueryString";

export const getListProducts = ({
  page,
  pageSize,
  search,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
}) => authApi<BaseListDataResponse<Product>>({
  method: 'GET',
  url: `/products`,
  params: {
    page,
    pageSize,
    search,
  },
});

export const createProduct = (data: CreateProductRequest) => authApi<Product>({
  method: 'POST',
  url: `/products`,
  data,
});

export const updateProduct = (productId: number, data: UpdateProductRequest) => authApi<Product>({
  method: 'PATCH',
  url: `/products/${productId}`,
  data,
}); 