"use client";

import React from "react";

import { IBooking } from "@/types";
import TutorBookingStatusChange from "./TutorBookingStatusChange";

const TutorViewBookingManagement = ({ booking }: { booking: IBooking }) => {
    return (
        <div className="space-y-2">
            {booking.paymentStatus !== "completed" &&
                booking.status !== "waiting_for_payment" &&
                booking.status !== "canceled_by_tutor" && (
                    <h2 className="text-lg font-bold">Action</h2>
                )}
            <div className="flex gap-x-3">
                {booking.status !== "canceled_by_student" &&
                    booking.status !== "waiting_for_payment" &&
                    booking.status !== "completed" &&
                    booking.status !== "canceled_by_tutor" &&
                    booking.paymentStatus !== "completed" && (
                        <TutorBookingStatusChange booking={booking} />
                    )}
            </div>
        </div>
    );
};

export default TutorViewBookingManagement;
