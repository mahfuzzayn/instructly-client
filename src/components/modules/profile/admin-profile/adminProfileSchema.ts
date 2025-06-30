import { z } from "zod";

export const adminProfileSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
});
