import { z } from "zod";

export const updateSubjectSchema = z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    gradeLevel: z.string().optional(),
});
