import { z } from 'zod';

export const productFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên thuốc không được để trống.',
  }),
  productCategoryId: z.number().min(1, {
    message: 'Danh mục sản phẩm không được để trống.',
  }),
  price: z.number().min(0, {
    message: 'Giá sản phẩm không được âm.',
  }),
  description: z.string().optional(),
}); 