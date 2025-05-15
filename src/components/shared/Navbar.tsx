"use client";

import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import logo from "../../assets/images/logo.png";
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
        <section className="py-4 border-b-1 border-[#3f2525]">
            <header className="container mx-auto flex justify-between items-center px-2 relative select-none">
                <Link href="/" className="flex items-center gap-x-2 pl-2">
                    <Image
                        src={logo}
                        height={40}
                        width={40}
                        alt="Instructly Logo"
                    />
                    <h2 className="text-2xl font-extrabold">Instructly</h2>
                </Link>
                <nav>
                    <ul className="hidden lg:flex gap-x-5 font-medium">
                        {navLinks.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.href}
                                className="text-black hover:text-it-medium-dark"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user?.email ? (
                            <>
                                <Link
                                    href={`/${user?.role}/dashboard`}
                                    className="hover:text-blue-500"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/"
                                    onClick={handleLogOut}
                                    className="hover:text-blue-500"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <Link href="/login" className="hover:text-blue-500">
                                Login
                            </Link>
                        )}
                    </ul>
                </nav>
                <nav className="absolute z-20 top-[56px] left-0 w-full">
                    <ul
                        className={`lg:hidden flex flex-col font-semibold bg-it-medium-dark w-full overflow-hidden ${
                            isMenuOpen && user
                                ? "h-[280px] pointer-events-auto"
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
                                    className="text-white px-6 py-2 hover:bg-it-secondary transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
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
                                color="black"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            />
                        ) : (
                            <X
                                color="black"
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
