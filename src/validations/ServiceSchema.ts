import { z } from 'zod';

export const serviceFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Tên dịch vụ không được để trống.',
  }),
  serviceCategoryId: z.number().min(1, {
    message: 'Danh mục dịch vụ không được để trống.',
  }),
  price: z.number().min(0, {
    message: 'Giá dịch vụ không được âm.',
  }),
  description: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
}); 