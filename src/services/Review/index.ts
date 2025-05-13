/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/verifyToken";

export type ReviewFormData = {
    student: string;
    tutor: string;
    rating: number;
    comment: string;
};

export const giveReview = async (reviewData: ReviewFormData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews/give-review`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getMyReviews = async (limit?: string, page?: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews/me?limit=${limit}&page=${page}&sort=-createdAt`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["REVIEW"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getSingleReview = async (reviewId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["REVIEW"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
