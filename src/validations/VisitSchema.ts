import { z } from 'zod';

export const existingVisitFormSchema = z.object({
  customerId: z.number().min(1, {
    message: 'Vui lòng chọn bệnh nhi.',
  }),
});

export const newCustomerVisitFormSchema = z.object({
  name: z.string().min(1, { message: 'Vui lòng nhập tên bệnh nhi' }),
  gender: z.enum(['MALE', 'FEMALE']),
  birthDate: z.string().min(1, { message: 'Vui lòng chọn ngày sinh' }),
  parentName: z.string().min(1, { message: 'Vui lòng nhập tên phụ huynh' }),
  parentPhone: z.string().min(1, { message: 'Vui lòng nhập số điện thoại' }),
  address: z.string().optional(),
}); 