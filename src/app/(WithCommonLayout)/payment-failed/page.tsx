import React from "react";
import CrossCheck from "../../../assets/gifs/animated-cross-x.gif";
import Image from "next/image";
import Link from "next/link";

const PaymentSuccessPage = async () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-it-light-primary space-y-10 p-10 rounded-xl">
                <div className="flex gap-x-2 items-center">
                    <Image
                        src={CrossCheck}
                        height={40}
                        width={40}
                        alt="Loading"
                    />
                    <h2 className="text-2xl text-destructive font-bold">
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
