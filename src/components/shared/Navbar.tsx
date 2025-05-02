"use client";

import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
    const { user, setIsLoading, setUser } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogOut = () => {
        logout();
        setUser(null);
        setIsLoading(true);

        if (protectedRoutes.some((route) => pathname.match(route))) {
            router.push("/");
        }
    };

    const navLinks = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/tutors",
            label: "Tutors",
        },
        {
            href: "/about-us",
            label: "About Us",
        },
        {
            href: "/faq",
            label: "FAQ",
        },
        {
            href: "/news",
            label: "News",
        },
    ];

    return (
        <header className="p-5">
            <nav className="flex justify-between items-center">
                <Link href="/" className="text-3xl font-extrabold">
                    Instructly
                </Link>
                <ul className="flex gap-x-5">
                    {navLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            href={link.href}
                            className="hover:text-blue-500"
                        >
                            {link.label}
                        </Link>
                    ))}
                    {user?.email ? (
                        <>
                            <li>
                                <Link
                                    href={`/${user?.role}/dashboard`}
                                    className="hover:text-blue-500"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    onClick={handleLogOut}
                                    className="hover:text-blue-500"
                                >
                                    Logout
                                </Link>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link href="/login" className="hover:text-blue-500">
                                Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
