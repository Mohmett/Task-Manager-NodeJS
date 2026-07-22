import { email, z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email must valid one"),
    password:z.string().min(6,"Password must be at least 6 characters").max(20,"Password must shorter 11 characters")
});