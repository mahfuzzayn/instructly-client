/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { IReview, ISubject, IUser } from "@/types";
import { revalidateTag } from "next/cache";

export const updateAdminProfile = async (adminData: FormData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/admin/update-profile`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
                body: adminData,
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

// Subject Management
export const getAllSubjectsByAdmin = async (
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
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/admin?limit=${limit}&page=${page}&${params}&sort=-createdAt`,
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

export const updateSubjectStatus = async (
    subjectId: string,
    updatedData: Partial<ISubject>
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${subjectId}/change-status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(updatedData),
            }
        );

        const result = await res.json();

        revalidateTag("SUBJECT");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

// User Management
export const getAllUsers = async (
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
            `${process.env.NEXT_PUBLIC_BASE_API}/users?limit=${limit}&page=${page}&${params}&sort=-createdAt`,
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

export const updateUserStatus = async (
    userId: string,
    updatedData: Partial<IUser>
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(updatedData),
            }
        );

        const result = await res.json();

        revalidateTag("USER");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

// Booking Management

// Review Management
export const updateReviewStatus = async (
    reviewId: string,
    updatedData: Partial<IReview>
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}/change-visibility`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(updatedData),
            }
        );

        const result = await res.json();

        revalidateTag("REVIEW");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
