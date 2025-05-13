import { z } from "zod";

export const giveReviewSchema = z.object({
    tutor: z.string({ required_error: "Tutor is required" }),
    rating: z.string({ required_error: "Rating is required" }),
    comment: z.string({ required_error: "Comment level is required" }),
});
