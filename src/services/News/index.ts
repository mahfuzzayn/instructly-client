"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getAllNews = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/news`, {
            method: "GET",
            next: {
                tags: ["NEWS"],
            },
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
