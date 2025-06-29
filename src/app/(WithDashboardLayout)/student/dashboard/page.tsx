/* eslint-disable react/no-unescaped-entities */

import StudentOverview from "@/components/modules/students/StudentOverview";
import { getMe } from "@/services/AuthService";
import { IStudent } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Student Dashboard ‣ Instructly",
    description:
        "Access your dashboard to see overview of learning journey, manage bookings and your profile as a student.",
};

const StudentDashboardPage = async () => {
    const { data: student }: { data: IStudent } = await getMe();

    return (
        <main className="space-y-5 m-5">
            <section className="flex flex-col md:flex-row gap-5 w-full">
                <StudentOverview student={student} />
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
                        {student?.bio ? (
                            <i>{student?.bio}</i>
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

export default StudentDashboardPage;
