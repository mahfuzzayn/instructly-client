import React from "react";
import LiquidCheck from "../../../assets/gifs/animated-check.gif";
import Image from "next/image";
import Link from "next/link";
import { getBookingByTrxId } from "@/services/Booking";

const PaymentSuccessPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ trxId: string }>;
}) => {
    const { trxId } = await searchParams;
    const { data: booking } = await getBookingByTrxId(trxId);

    if (!booking) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-it-light-primary space-y-10 p-10 rounded-xl">
                    <div className="flex gap-x-2 items-center">
                        <h2 className="text-2xl text-destructive font-bold">
                            Invalid Transaction ID
                        </h2>
                    </div>
                    <p className="max-w-sm text-it-secondary">
                        Note: If a new payment was initiated then previous
                        transaction ID of your booking may have been changed,
                        head over to{" "}
                        <Link href="/student/dashboard/bookings" className="font-semibold underline">
                            Dashboard
                        </Link> to overlook changes.
                        .
                    </p>
                    <p className="text-it-secondary text-center">
                        Back to{" "}
                        <Link href="/" className="font-semibold underline">
                            Home
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-it-light-primary space-y-10 p-10 rounded-xl">
                <div className="flex gap-x-2 items-center">
                    <Image
                        src={LiquidCheck}
                        height={40}
                        width={40}
                        alt="Loading"
                    />
                    <h2 className="text-2xl text-destructive font-bold">Payment Successful</h2>
                </div>
                <p className="text-it-secondary text-center">
                    View Booking on{" "}
                    <Link
                        href={`/student/dashboard/bookings/${booking?._id}`}
                        className="font-semibold underline"
                    >
                        Dashboard
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
