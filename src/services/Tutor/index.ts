/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/verifyToken";

export const getMe = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/me`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
