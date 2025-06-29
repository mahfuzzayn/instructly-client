import React from "react";
import LiquidCheck from "../../../assets/gifs/animated-check.gif";
import Image from "next/image";
import Link from "next/link";
import { getBookingByTrxId } from "@/services/Booking";
import CrossCheck from "../../../assets/gifs/animated-cross-x.gif";

const PaymentSuccessPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ trxId: string }>;
}) => {
    const { trxId } = await searchParams;
    const { data: booking } = await getBookingByTrxId(trxId);

    if (!booking) {
        return (
            <div className="min-h-screen pt-36 pb-20 flex justify-center items-center px-4">
                <div
                    className="space-y-5 p-10 rounded-xl border-[1px] border-[#fffff36f]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <div className="flex gap-x-2 md:gap-x-3 items-center">
                        <Image
                            src={CrossCheck}
                            height={50}
                            width={50}
                            className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
                            alt="Payment Failed"
                        />
                        <h2 className="text-3xl md:text-4xl text-destructive font-bold">
                            Invalid Transaction ID
                        </h2>
                    </div>
                    <p className="max-w-lg text-it-secondary">
                        <span className="font-semibold">Note:</span> If a new
                        payment was initiated then previous transaction ID of
                        your booking may have been changed, head over to{" "}
                        <Link
                            href="/student/dashboard/bookings"
                            className="font-semibold underline"
                        >
                            Dashboard
                        </Link>{" "}
                        to overlook changes. .
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
        <div className="min-h-screen pt-36 pb-20 flex justify-center items-center">
            <div className="bg-it-light-primary space-y-10 p-10 rounded-xl">
                <div className="flex gap-x-2 md:gap-x-3 items-center">
                    <Image
                        src={LiquidCheck}
                        height={50}
                        width={50}
                        className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
                        alt="Successful Payment"
                    />
                    <h2 className="text-3xl md:text-4xl text-destructive font-bold">
                        Payment Success
                    </h2>
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
