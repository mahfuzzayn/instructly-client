"use client";

import React from "react";
import StudentInitiatePayment from "./StudentInitiatePayment";
import StudentBookingStatusChange from "./StudentBookingStatusChange";
import { IBooking } from "@/types";

const StudentViewBookingManagement = ({ booking }: { booking: IBooking }) => {
    return (
        <div className="space-y-2">
            {booking.paymentStatus !== "completed" &&
                booking.status === "waiting_for_payment" && (
                    <h2 className="text-xl text-it-medium-dark font-bold">Action</h2>
                )}
            <div className="flex gap-x-3">
                {booking.paymentStatus !== "completed" &&
                    booking.status === "waiting_for_payment" && (
                        <StudentInitiatePayment booking={booking} />
                    )}
                {booking.status !== "pending_approval" &&
                    booking.status !== "canceled_by_student" &&
                    booking.status !== "canceled_by_tutor" &&
                    booking.status !== "completed" &&
                    booking.paymentStatus !== "completed" && (
                        <StudentBookingStatusChange booking={booking} />
                    )}
            </div>
        </div>
    );
};

export default StudentViewBookingManagement;
