import { z } from 'zod';

export const visitDetailSchema = z.object({
  totalAmount: z.number().optional(),
  totalDiscount: z.number().optional(),
  diagnosis: z.string().optional(),
  symptoms: z.string().optional(),
  personalMedicalHistory: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  prescription: z.object({
    totalAmount: z.number().optional(),
    totalDiscount: z.number().optional(),
    prescriptionItems: z.array(z.object({
      productId: z.number(),
      productName: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
      discount: z.number().min(0),
      morningDosage: z.number().min(0),
      noonDosage: z.number().min(0),
      afternoonDosage: z.number().min(0),
      eveningDosage: z.number().min(0),
      usageInstructions: z.string().optional(),
      doctorNotes: z.string().optional(),
    })),
  }),
  serviceUsage: z.object({
    totalAmount: z.number().optional(),
    totalDiscount: z.number().optional(),
    serviceUsageItems: z.array(z.object({
      serviceId: z.number(),
      serviceName: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
      discount: z.number().min(0),
      usageInstructions: z.string().optional(),
      doctorNotes: z.string().optional(),
    })),
  }),
  reExaminationTime: z.string().optional(),
  advice: z.string().optional(),
  status: z.enum(['NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
}); 