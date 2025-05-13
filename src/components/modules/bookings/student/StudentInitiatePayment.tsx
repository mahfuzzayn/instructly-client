/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { initiatePayment } from "@/services/Booking";
import { IBooking } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const StudentInitiatePayment = ({ booking }: { booking: IBooking }) => {
    const router = useRouter();

    const handleInitiatePayment = async () => {
        const toastId = toast.loading("Initiating Payment...");

        try {
            const res = await initiatePayment(booking?._id);

            if (res.success) {
                toast.success(res.message, { id: toastId });

                setTimeout(() => {
                    toast.success("Redirecting to Payment Page...", {
                        id: toastId,
                    });
                }, 1000);

                setTimeout(() => {
                    router.push(res.data);
                }, 3000);
            } else {
                toast.warning(res.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error("Failed to Initiate Payment", { id: toastId });

            return Error(error);
        }
    };

    return (
        <Button
            className="text-white bg-red-400 hover:bg-red-500"
            title="Pay"
            onClick={handleInitiatePayment}
        >
            Pay
        </Button>
    );
};

export default StudentInitiatePayment;
