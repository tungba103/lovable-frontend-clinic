import { z } from 'zod';

export const visitFormSchema = z.object({
  customerId: z.number().min(1, {
    message: 'Vui lòng chọn bệnh nhi.',
  }),
}); 