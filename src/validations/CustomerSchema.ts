import { z } from 'zod';

export const customerFormSchema = z.object({
  name: z.string().min(0, {
    message: 'Tên bệnh nhi không được để trống.',
  }),
  gender: z.enum(['MALE', 'FEMALE']).refine((data) => data === 'MALE' || data === 'FEMALE', {
    message: 'Giới tính không được để trống.',
  }),
  birthDate: z.string().date(),
  parentName: z.string().min(0, {
    message: 'Tên phụ huynh không được để trống.',
  }),
  parentPhone: z.string().min(0, {
    message: 'Số điện thoại không được để trống.',
  }),
  address: z.string().min(0, {
    message: 'Địa chỉ không được để trống.',
  }),
});
