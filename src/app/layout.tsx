import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const railwaySans = Raleway({
    variable: "--font-railway",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Instructly",
    description:
        "Empowering learners with personalized courses, expert instructors, and a seamless learning experience. Unlock your potential with innovative education today!",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${railwaySans.className} antialiased bg-it-extra-light`}
            >
                <Providers>
                    <Toaster richColors={true} position="top-center" />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
