import { z } from "zod";

export const taskValidationSchema = z.object({
    title: z.string().min(1, "Must enter Title").toLowerCase(),
    decription: z.string().optional(),
    // status: z.enum["pending", "in progress", "completed"],
    // expiryDate: z.date()
});