import { z } from 'zod';

export const productCategoryFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên danh mục không được để trống.',
  }),
  description: z.string().optional(),
}); 