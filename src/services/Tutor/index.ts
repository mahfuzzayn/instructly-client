/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

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

export const deleteSubject = async (subjectId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${subjectId}/discontinue`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
            }
        );

        revalidateTag("SUBJECT");
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
