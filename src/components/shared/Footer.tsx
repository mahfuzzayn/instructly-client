import Link from "next/link";
import logo from "@/assets/images/logo_2.png";
import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="footer-section bg-gradient-to-tr from-it-primary to-it-secondary px-10 py-10">
            <div className="max-w-[1280px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-evenly gap-10 mb-12">
                    <div className="flex">
                        <Link
                            href="/"
                            className="flex flex-col items-center gap-x-2"
                        >
                            <Image
                                src={logo}
                                height={500}
                                width={500}
                                className="w-full max-w-[100px]"
                                alt="Instructly Logo"
                            />
                            <h2 className="text-2xl text-white font-extrabold">
                                Instructly
                            </h2>
                        </Link>
                    </div>
                    <div>
                        <h2 className="text-left font-bold text-white">
                            Quick Links
                        </h2>
                        <ul className="flex flex-col gap-2 items-start text-white mt-2">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tutors"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    Tutors
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about-us"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/news"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    News
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-left font-bold text-white">
                            Authentication
                        </h2>
                        <ul className="flex flex-col gap-2 items-start text-white mt-2">
                            <li>
                                <Link
                                    href="/login"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/signup"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    Signup
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="hover:text-it-medium-dark font-medium transition-all"
                                >
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Image
                            src="https://gadgetbd.com/wp-content/uploads/2020/03/SSLCommerz-Pay-With-logo-All-Size-01.png"
                            height={400}
                            width={1200}
                            alt="sdsd"
                        />
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-white">
                        <span>
                            Copyright © 2025 Instructly All Rights Reserved.
                            Powered by{" "}
                        </span>
                        <Link
                            href="https://mzayn.vercel.app/"
                            className="font-semibold hover:text-it-medium-dark transition-colors"
                            target="_blank"
                        >
                            Mahfuz Zayn{" "}
                        </Link>
                        <span className="text-red-500">❤</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
