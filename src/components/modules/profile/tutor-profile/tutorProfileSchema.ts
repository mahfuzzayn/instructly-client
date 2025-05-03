import { z } from "zod";

export enum DaysOfWeek {
    Saturday = "Saturday",
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
}

export const tutorProfileSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    hourlyRate: z.string().optional(),
    availability: z
        .array(
            z.object({
                day: z.nativeEnum(DaysOfWeek, {
                    errorMap: () => ({
                        message:
                            "Expected a valid day of the week (e.g., Monday).",
                    }),
                }),
                startTime: z
                    .string()
                    .regex(
                        /^\d{1,2}:\d{2}$/,
                        "Start time must be in hh:mm format"
                    ),
                endTime: z
                    .string()
                    .regex(
                        /^\d{1,2}:\d{2}$/,
                        "End time must be in hh:mm format"
                    ),
            })
        )
        .optional(),
});
