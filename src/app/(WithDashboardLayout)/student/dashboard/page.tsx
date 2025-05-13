/* eslint-disable react/no-unescaped-entities */
import { getMe } from "@/services/AuthService";
import { IStudent } from "@/types";
import Link from "next/link";
import React from "react";

const StudentDashboardPage = async () => {
    const { data: student }: { data: IStudent } = await getMe();

    return (
        <main className="space-y-5 m-5">
            <section className="flex flex-col md:flex-row gap-5 w-full">
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-2">
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/student/dashboard/bookings`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Bookings
                        </Link>
                    </h2>
                    <p className="text-4xl font-extrabold">
                        {student?.bookingHistory?.length || 0}
                    </p>
                </div>
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-2">
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/student/dashboard/reviews`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Reviews
                        </Link>
                    </h2>
                    <p className="text-4xl font-extrabold">
                        {student?.reviewsGiven?.length || 0}
                    </p>
                </div>
            </section>
            <section className="flex gap-5 w-full">
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-4">
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
