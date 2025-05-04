import { z } from "zod";

export const studentProfileSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    gradeLevel: z.string().optional(),
    subjectsOfInterest: z.array(z.string()).optional(),
});
