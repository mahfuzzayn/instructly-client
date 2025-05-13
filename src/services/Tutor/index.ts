/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllTutors = async (
    page?: string,
    limit?: string,
    query?: { [key: string]: string | string[] | undefined }
) => {
    const params = new URLSearchParams();

    if (query?.subjects) {
        params.append("subjects", query?.subjects.toString());
    }

    if (query?.rating) {
        params.append("rating", query?.rating?.toString());
    }

    if (query?.maxHRate) {
        params.append("maxHRate", query?.maxHRate.toString());
    }

    if (query?.availability) {
        params.append("availability", query?.availability.toString());
    }

    if (query?.location) {
        params.append("location", query?.location.toString());
    }

    if (query?.sort) {
        params.append("sort", query?.sort.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/tutors?limit=${limit}&page=${page}&${params}`,
            {
                method: "GET",
                next: {
                    tags: ["USER"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getSingleTutor = async (tutorId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/tutors/${tutorId}`,
            {
                method: "GET",
                next: {
                    tags: ["USER"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getMySubjects = async (
    page?: string,
    limit?: string,
    query?: {
        [key: string]: string | string[] | undefined;
    }
) => {
    const token = await getValidToken();
    const params = new URLSearchParams();

    if (query?.category) {
        params.append("category", query?.category.toString());
    }

    if (query?.gradeLevel) {
        params.append("gradeLevel", query?.gradeLevel.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/my-subjects?limit=${limit}&page=${page}&${params}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["SUBJECT"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateTutorProfile = async (tutorData: FormData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/tutor/update-profile`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
                body: tutorData,
            }
        );

        revalidateTag("USER");
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
