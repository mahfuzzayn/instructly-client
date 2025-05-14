/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-it-extra-light text-it-medium-dark px-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-it-destructive mb-4">
                404
            </h1>
            <p className="text-lg text-center font-semibold text-it-secondary mb-6">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link href="/">
                <button className="px-4 py-2 bg-it-primary text-it-extra-light text-lg rounded-md shadow-md hover:bg-it-medium-primary transition-colors font-bold">
                    Back to Home
                </button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
