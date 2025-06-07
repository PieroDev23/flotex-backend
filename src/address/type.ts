import { z } from "zod";



export const addressSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.number(),
  country: z.string(),
  city: z.string(),
  address: z.string().min(10),
  reference: z.string().optional(),
});

export type Address = z.infer<typeof addressSchema>;