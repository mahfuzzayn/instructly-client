import React from "react";
import CrossCheck from "../../../assets/gifs/animated-cross-x.gif";
import Image from "next/image";
import Link from "next/link";

const PaymentSuccessPage = async () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div
                className="space-y-5 p-10 rounded-xl border-[1px] border-[#fffff36f]"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <div className="flex gap-x-2 items-center">
                    <Image
                        src={CrossCheck}
                        height={60}
                        width={60}
                        className="h-[40px] w-[40px] md:h-[60px] md:w-[60px]"
                        alt="Loading"
                    />
                    <h2 className="text-3xl md:text-4xl text-destructive font-bold">
                        Payment Failed
                    </h2>
                </div>
                <p className="text-it-secondary text-center">
                    Back to{" "}
                    <Link href="/" className="font-semibold underline">
                        Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
