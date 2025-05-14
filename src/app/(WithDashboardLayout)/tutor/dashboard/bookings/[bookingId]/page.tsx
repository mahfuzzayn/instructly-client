/* eslint-disable react/no-unescaped-entities */
import TutorViewBookingManagement from "@/components/modules/bookings/tutor/TutorViewBookingManagement";
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
        } ‣ Tutor Dashboard ‣ Instructly`,
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
                <h2 className="text-2xl font-bold">Invalid Booking ID</h2>
                <p>
                    Booking ID:{" "}
                    <span className="font-semibold">{bookingId}</span>
                </p>
                <Link href="/tutor/dashboard/bookings">
                    <Button className="hover:bg-it-light-dark font-semibold mb-5">
                        <ArrowLeft /> Bookings
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[960px] mx-auto px-5 my-10 space-y-4">
            <Link href={`/tutor/dashboard/bookings/`}>
                <Button className="hover:bg-it-light-dark font-semibold mb-5">
                    <ArrowLeft /> Bookings
                </Button>
            </Link>
            <h2 className="text-3xl font-bold w-full !mb-8">
                Booking{" "}
                <span className="text-lg font-normal">({booking?._id})</span>
            </h2>
            <p className="flex gap-x-1">
                Tutor:{" "}
                <span className="flex flex-wrap gap-x-1">
                    <span className="font-semibold">
                        {booking?.tutor?.user?.name}
                    </span>
                    <Link
                        href={`mailto:${booking?.tutor?.user?.email}`}
                        className="font-semibold text-it-destructive"
                    >
                        ({booking?.tutor?.user?.email})
                    </Link>
                </span>
            </p>
            <p>
                Location:{" "}
                <span className="font-semibold text-it-medium-dark">
                    {booking?.tutor?.location}
                </span>
            </p>
            <p>
                Total Hours:{" "}
                <span className="font-semibold">{booking?.totalHours}</span>
            </p>
            <p>
                Total Months:{" "}
                <span className="font-semibold">{booking?.months}</span>
            </p>
            <p>
                Start Date:{" "}
                <span className="font-semibold text-it-medium-dark">
                    {moment(booking?.date).format("h:mm A DD MMM, YYYY")}
                </span>
            </p>
            <div className="space-y-2">
                <h2 className="font-bold text-it-medium-dark">
                    Subjects that will be taught
                </h2>
                <div>
                    {booking?.tutor?.subjects.map((subject, idx) => (
                        <li key={idx} className="font-semibold">
                            {subject?.name}
                        </li>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="font-bold text-it-medium-dark">Time Slots</h2>
                <div>
                    {booking?.timeSlots.map((slot, idx) => (
                        <li key={idx} className="list-decimal space-x-2">
                            <span className="font-semibold">{slot?.day}</span>
                            <span>{slot?.startTime}</span>
                            <span>-</span>
                            <span>{slot?.endTime}</span>
                        </li>
                    ))}
                </div>
            </div>
            <div className="!mt-8">
                <h2 className="text-xl font-bold">Payment Information</h2>
                <span className="border-2 border-it-medium-primary"></span>
                <div className="space-y-4">
                    <p className="flex gap-x-2">
                        Total Price:{" "}
                        <span className="font-semibold text-it-medium-dark">
                            {booking?.price} Taka
                        </span>
                    </p>
                    <p className="flex gap-x-2">
                        Status: <ITStatusBadge status={booking?.status} />
                    </p>
                    <p className="flex gap-x-2">
                        Payment Status:
                        <ITPaymentStatusBadge status={booking?.paymentStatus} />
                    </p>
                    <p>
                        Transaction ID:{" "}
                        <span className="font-semibold text-it-medium-dark">
                            {booking?.transactionId || (
                                <i>Payment isn't initiated yet</i>
                            )}
                        </span>
                    </p>
                    <TutorViewBookingManagement booking={booking} />
                </div>
            </div>
        </div>
    );
};

export default TutorBookingPage;
