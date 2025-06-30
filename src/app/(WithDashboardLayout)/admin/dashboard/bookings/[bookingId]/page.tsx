/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { ITPaymentStatusBadge } from "@/components/ui/core/ITPaymentStatusBadge/ITPaymentStatusBadge";
import { ITStatusBadge } from "@/components/ui/core/ITStatusBadge/ITStatusBadge";
import { getSingleBooking } from "@/services/Booking";
import { IBooking } from "@/types";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ bookingId: string }>;
}) => {
    const { bookingId } = await params;
    const { data: booking }: { data: IBooking } = await getSingleBooking(
        bookingId
    );

    return {
        title: `${
            booking?.createdAt
                ? `Booking (${booking?._id.slice(0, 3)}...${booking?._id.slice(
                      booking?._id.length - 3,
                      booking?._id.length
                  )})`
                : "Invalid Booking"
        } ‣ Admin Dashboard ‣ Instructly`,
        description: `${
            booking?.createdAt
                ? `Confirm your booking with tutor ${booking?.tutor?.user?.name}. Enhance your learning journey and achieve your academic goals.`
                : "Invalid Booking, so we can't provide any description."
        }`,
    };
};

const TutorBookingPage = async ({
    params,
}: {
    params: Promise<{ bookingId: string }>;
}) => {
    const { bookingId } = await params;
    const { data: booking }: { data: IBooking } = await getSingleBooking(
        bookingId
    );

    if (!booking) {
        return (
            <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
                <h2 className="text-2xl md:text-3xl text-it-medium-dark font-bold text-center">
                    Invalid Booking ID
                </h2>
                <p className="text-lg text-center">
                    Booking ID:{" "}
                    <span className="font-semibold">{bookingId}</span>
                </p>
                <Link href="/student/dashboard/bookings">
                    <Button className="bg-it-secondary hover:bg-it-light-dark font-semibold mb-5">
                        <ArrowLeft /> Bookings
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-5">
            <Link href={`/admin/dashboard/bookings/`}>
                <Button className="bg-it-secondary hover:bg-it-light-dark font-semibold mb-10">
                    <ArrowLeft /> Bookings
                </Button>
            </Link>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-x-1.5 items-start sm:items-center">
                    <h2 className="text-2xl text-it-medium-dark font-bold">
                        Booking
                    </h2>
                    <p className="space-x-1">
                        <span>(</span>
                        <span className="font-semibold">{booking?._id}</span>
                        <span>)</span>
                    </p>
                </div>
                <div className="space-y-2 !mb-6">
                    <p className="flex gap-x-1 font-medium">
                        Tutor:{" "}
                        <span className="flex flex-wrap gap-x-1">
                            <span className="font-bold">
                                {booking?.tutor?.user?.name}
                            </span>
                            <Link
                                href={`mailto:${booking?.tutor?.user?.email}`}
                                className="font-bold text-it-destructive"
                            >
                                ({booking?.tutor?.user?.email})
                            </Link>
                        </span>
                    </p>
                    <p className="font-medium">
                        Location:{" "}
                        <span className="font-bold text-it-medium-dark">
                            {booking?.tutor?.location}
                        </span>
                    </p>
                    <p className="font-medium">
                        Total Hours:{" "}
                        <span className="font-bold">{booking?.totalHours}</span>
                    </p>
                    <p className="font-medium">
                        Total Months:{" "}
                        <span className="font-bold">{booking?.months}</span>
                    </p>
                    <p className="font-medium">
                        Start Date:{" "}
                        <span className="font-bold text-it-medium-dark">
                            {moment(booking?.date).format(
                                "h:mm A DD MMM, YYYY"
                            )}
                        </span>
                    </p>
                </div>
                <div className="space-y-2 !mb-6">
                    <h2 className="font-bold text-xl text-it-medium-dark">
                        Subjects that will be taught
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                        {booking?.tutor?.subjects.map((subject, idx) => (
                            <p
                                key={idx}
                                className="font-semibold list-none bg-it-medium-dark text-white px-2 py-1 rounded-sm"
                            >
                                {subject?.name}
                            </p>
                        ))}
                    </ul>
                </div>
                <div className="space-y-2">
                    <h2 className="font-bold text-xl text-it-medium-dark">
                        Time Slots
                    </h2>
                    <ul className="flex flex-wrap gap-2">
                        {booking?.timeSlots.map((slot, idx) => (
                            <li
                                key={idx}
                                className="list-none bg-it-secondary text-white space-x-2 px-2 py-1 rounded-sm"
                            >
                                <span className="font-semibold">
                                    {slot?.day}
                                </span>
                                <span>{slot?.startTime}</span>
                                <span>-</span>
                                <span>{slot?.endTime}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="!mt-8">
                    <h2 className="text-xl text-it-medium-dark font-bold">
                        Payment Information
                    </h2>
                    <span className="border-2 border-it-medium-primary"></span>
                    <div className="space-y-3">
                        <p className="flex gap-x-2 font-medium">
                            Total Price:{" "}
                            <span className="font-semibold text-it-medium-dark">
                                {booking?.price} Taka
                            </span>
                        </p>
                        <p className="flex gap-x-2 font-medium">
                            Status: <ITStatusBadge status={booking?.status} />
                        </p>
                        <p className="flex gap-x-2 font-medium">
                            Payment Status:
                            <ITPaymentStatusBadge
                                status={booking?.paymentStatus}
                            />
                        </p>
                        <p className="flex flex-col sm:flex-row gap-2 font-medium items-start sm:items-center">
                            Transaction ID:{" "}
                            <span className="font-semibold text-it-medium-dark bg-white px-2 py-1 rounded-md cursor-pointer">
                                {booking?.transactionId || (
                                    <i>Payment isn't initiated yet</i>
                                )}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorBookingPage;
