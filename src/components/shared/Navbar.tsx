"use client";

import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import logo from "../../assets/images/logo_2.png";
import { protectedRoutes } from "@/constants";
import Image from "next/image";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, setIsLoading, setUser } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogOut = () => {
        logout();
        setUser(null);
        setIsMenuOpen(false);
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
        <section className="py-4 fixed top-0 w-full bg-it-medium-dark z-[100]">
            <header className="container max-w-[1280px] mx-auto flex justify-between items-center px-2 relative select-none">
                <Link href="/" className="flex items-center gap-x-2 pl-2">
                    <Image
                        src={logo}
                        height={40}
                        width={40}
                        alt="Instructly Logo"
                    />
                    <h2 className="text-2xl text-white font-extrabold">
                        Instructly
                    </h2>
                </Link>
                <nav>
                    <ul className="hidden lg:flex gap-x-5 font-medium">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="text-white hover:text-it-primary transition-all duration-300"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.email ? (
                            <>
                                <Link
                                    href={`/${user?.role}/dashboard`}
                                    className="text-white hover:text-it-primary transition-all duration-300 group relative"
                                >
                                    Dashboard
                                    {user?.role === "tutor" ? (
                                        <ul className="mega-menu bg-it-medium-dark rounded-[8px] absolute -left-[18px] h-0 invisible opacity-70 pointer-events-none group-hover:opacity-100 group-hover:h-[150px] group-hover:visible group-hover:pointer-events-auto overflow-hidden transition-all duration-300 ease-in-out">
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard`}
                                                    className="block text-white hover:text-it-primary transition-all duration-300 pt-4 px-6 pb-1 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/bookings`}
                                                    className="block text-white hover:text-it-primary transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Bookings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/subjects`}
                                                    className="block text-white hover:text-it-primary transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Subjects
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/reviews`}
                                                    className="block text-white hover:text-it-primary transition-all duration-300 py-1 px-6 pb-4 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="mega-menu bg-it-medium-dark rounded-[8px] absolute -left-[18px] h-0 invisible opacity-70 pointer-events-none group-hover:opacity-100 group-hover:h-[120px] group-hover:visible group-hover:pointer-events-auto overflow-hidden transition-all duration-300 ease-in-out">
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard`}
                                                    className="block text-white hover:text-it-primary transition-all duration-300 pt-4 px-6 pb-1 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/bookings`}
                                                    className="block text-white hover:text-it-primary transition-all duration-300 py-1 px-6 w-full"
                                                >
                                                    Bookings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/reviews`}
                                                    className="block text-white hover:text-it-primary transition-all duration-300 py-1 px-6 pb-4 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </Link>
                                <button
                                    onClick={handleLogOut}
                                    className="text-white hover:text-it-primary transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="text-white hover:text-it-primary transition-all duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </ul>
                </nav>
                <nav className="absolute z-20 top-[56px] left-0 w-full">
                    <ul
                        className={`lg:hidden flex flex-col font-semibold bg-it-medium-dark w-full overflow-hidden ${
                            isMenuOpen && user
                                ? `${
                                      user.role === "tutor"
                                          ? "h-[452px]"
                                          : "h-[412px]"
                                  } pointer-events-auto`
                                : isMenuOpen
                                ? "h-[240px] pointer-events-auto"
                                : "h-0 pointer-events-none"
                        } transition-all`}
                    >
                        {navLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white px-6 py-2 hover:bg-it-secondary transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.email ? (
                            <>
                                <Link
                                    href={`/${user?.role}/dashboard`}
                                    className="text-white px-6 py-2 hover:bg-it-secondary transition-all group"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                    {user?.role === "tutor" ? (
                                        <ul className="mega-menu rounded-[8px] mt-2 mb-1 ml-2">
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard`}
                                                    className="block text-white hover:bg-it-primary transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/bookings`}
                                                    className="block text-white hover:bg-it-primary transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Bookings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/subjects`}
                                                    className="block text-white hover:bg-it-primary transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Subjects
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/reviews`}
                                                    className="block text-white hover:bg-it-primary transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="mega-menu rounded-[8px] mt-2 mb-1 ml-2">
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard`}
                                                    className="block text-white hover:bg-it-primary transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Overview
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/bookings`}
                                                    className="block text-white hover:bg-it-primary transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Bookings
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={`${user.role}/dashboard/reviews`}
                                                    className="block text-white hover:bg-it-primary transition-all duration-300 py-2 px-4 w-full"
                                                >
                                                    Reviews
                                                </Link>
                                            </li>
                                        </ul>
                                    )}
                                </Link>
                                <Link
                                    href="/"
                                    onClick={() => {
                                        handleLogOut();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-white px-6 py-2 hover:bg-it-secondary transition-all"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white px-6 py-2 hover:bg-it-secondary transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </ul>
                </nav>
                <div className="flex lg:hidden gap-x-5 items-center p-2">
                    <div className="lg:hidden hamburger cursor-pointer">
                        {!isMenuOpen ? (
                            <MenuIcon
                                color="white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        ) : (
                            <X
                                color="white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        )}
                    </div>
                </div>
            </header>
        </section>
    );
};

export default Navbar;
