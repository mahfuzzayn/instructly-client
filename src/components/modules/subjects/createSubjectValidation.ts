import { z } from "zod";

export const createSubjectSchema = z.object({
    tutor: z.string({ required_error: "Tutor ID is required" }),
    name: z.string({ required_error: "Name is required" }),
    category: z.string({ required_error: "Category is required" }),
    gradeLevel: z.string({ required_error: "Grade level is required" }),
});
