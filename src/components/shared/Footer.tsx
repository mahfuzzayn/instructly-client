import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="p-5 text-center">
            <p>
                Copyright © 2025 Instructly All Rights Reserved. Powered by{" "}
                <Link href="https://mzayn.vercel.app/" className="hover:text-blue-500" target="_blank">
                    Mahfuz Zayn
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
