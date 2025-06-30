/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";

export const updateStudentProfile = async (studentData: FormData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/student/update-profile`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
                body: studentData,
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

export const getAllStudents = async (
    page?: string,
    limit?: string,
    query?: { [key: string]: string | string[] | undefined }
) => {
    const token = await getValidToken();
    const params = new URLSearchParams();

    if (query?.subjectsOfInterest) {
        params.append(
            "subjectsOfInterest",
            query?.subjectsOfInterest.toString()
        );
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/students?limit=${limit}&page=${page}&${params}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
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
