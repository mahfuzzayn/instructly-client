import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-it-light-primary p-5 text-center">
            <p>
                <span>
                    Copyright © 2025 Instructly All Rights Reserved. Powered by{" "}
                </span>
                <Link
                    href="https://mzayn.vercel.app/"
                    className="font-semibold hover:text-it-secondary transition-colors"
                    target="_blank"
                >
                    Mahfuz Zayn{" "}
                </Link>
                <span className="text-red-500">❤</span>
            </p>
        </footer>
    );
};

export default Footer;
