import { z } from 'zod';

export const userFormSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  name: z.string().min(1, 'Vui lòng nhập họ và tên'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
}); 