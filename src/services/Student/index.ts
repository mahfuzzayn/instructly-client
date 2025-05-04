/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";

export const updateStudentProfile = async (tutorData: FormData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/student/update-profile`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
                body: tutorData,
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
