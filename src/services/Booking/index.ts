"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { getValidToken } from "@/lib/verifyToken";
import { IStatusForStudent, IStatusForTutor } from "@/types";
import { revalidateTag } from "next/cache";

export interface IBookingData {
    tutor: string;
    date: string;
    months: number;
    timeSlots: string[];
}

export const createBooking = async (bookingData: IBookingData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookings/create-booking`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getMyBookings = async (limit?: string, page?: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookings?limit=${limit}&page=${page}&sort=-createdAt`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["BOOKING"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getSingleBooking = async (bookingId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookings/${bookingId}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["BOOKING"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getBookingByTrxId = async (trxId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookings/trx/${trxId}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["BOOKING"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const changeBookingStatus = async (
    bookingId: string,
    statusData: { status: IStatusForTutor | IStatusForStudent }
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookings/change-status/${bookingId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(statusData),
            }
        );

        const result = await res.json();
        revalidateTag("BOOKING");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const initiatePayment = async (bookingId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/bookings/${bookingId}/pay`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await res.json();
        revalidateTag("BOOKING");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
