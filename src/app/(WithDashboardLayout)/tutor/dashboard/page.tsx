/* eslint-disable react/no-unescaped-entities */
import TutorOverview from "@/components/modules/tutors/TutorOverview";
import { bangladeshiCurrencyFormatter } from "@/lib/currencyFormatter";
import { getMe } from "@/services/AuthService";
import { getMySubjects } from "@/services/Tutor";
import { ISubject, ITutor } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "Tutor Dashboard ‣ Instructly",
    description:
        "Access your dashboard to see overview, manage bookings, subjects, and your profile as a tutor.",
};

const TutorDashboardPage = async () => {
    const { data: tutor }: { data: ITutor } = await getMe();
    const { data: subjects }: { data: ISubject[] } = await getMySubjects();

    return (
        <main className="space-y-5 m-5">
            <section className="flex flex-col md:flex-row gap-5 w-full">
                <div
                    className="w-full rounded-md p-5 space-y-2 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">Earnings</h2>
                    <p className="text-4xl font-extrabold">
                        {bangladeshiCurrencyFormatter(tutor?.earnings) ||
                            `0 Taka`}
                    </p>
                </div>
                <div
                    className="w-full rounded-md p-5 space-y-2 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">Hourly Rate</h2>
                    <p className="text-4xl font-extrabold">
                        {tutor?.hourlyRate || 0} Taka/hr
                    </p>
                </div>
            </section>
            <section className="flex gap-5 w-full">
                <div
                    className="w-full rounded-md p-5 space-y-4 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/tutor/dashboard/subjects`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Subjects
                        </Link>
                    </h2>
                    {tutor?.subjects.length > 0 ? (
                        <ul className="flex flex-wrap gap-5">
                            {subjects.map((subject, idx) => (
                                <li
                                    key={idx}
                                    className="text-lg font-extrabold"
                                >
                                    {subject?.name}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-2">
                            <i className="font-semibold">
                                You don't have any subjects yet.
                            </i>
                        </p>
                    )}
                </div>
            </section>
            <section className="flex flex-col md:flex-row gap-5 w-full">
                <TutorOverview tutor={tutor} />
            </section>
            <section className="flex gap-5 w-full">
                <div
                    className="w-full rounded-md p-5 space-y-4 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">Bio</h2>
                    <p className="text-xl font-extrabold">
                        {tutor?.bio ? (
                            <i>{tutor?.bio}</i>
                        ) : (
                            <i className="text-gray-500">
                                You didn't set your bio, go to manage profile
                                and insert information.
                            </i>
                        )}
                    </p>
                </div>
            </section>
        </main>
    );
};

export default TutorDashboardPage;
