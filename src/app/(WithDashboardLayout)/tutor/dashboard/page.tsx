import { getMe } from "@/services/AuthService";
import { getMySubjects } from "@/services/Tutor";
import { ISubject, ITutor } from "@/types";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
    const { data: tutor }: { data: ITutor } = await getMe();
    const { data: subjects }: { data: ISubject[] } = await getMySubjects();

    return (
        <main className="space-y-5">
            <section className="flex gap-5 w-full">
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-2">
                    <h2 className="text-2xl font-normal">Earnings</h2>
                    <p className="text-4xl font-extrabold">
                        ${tutor?.earnings}
                    </p>
                </div>
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-2">
                    <h2 className="text-2xl font-normal">Hourly Rate</h2>
                    <p className="text-4xl font-extrabold">
                        ${tutor?.hourlyRate}/hr
                    </p>
                </div>
            </section>
            <section className="flex gap-5 w-full">
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-4">
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/tutor/dashboard/subjects`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Subjects
                        </Link>
                    </h2>
                    <ul className="flex flex-wrap gap-5">
                        {subjects.map((subject, idx) => (
                            <li key={idx} className="text-lg font-extrabold">
                                {subject?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className="flex gap-5 w-full">
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-2">
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/tutor/dashboard/bookings`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Bookings
                        </Link>
                    </h2>
                    <p className="text-4xl font-extrabold">
                        {tutor?.bookings?.length}
                    </p>
                </div>
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-2">
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/tutor/dashboard/reviews`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Reviews
                        </Link>
                    </h2>
                    <p className="text-4xl font-extrabold">
                        {tutor?.reviews?.length}
                    </p>
                </div>
            </section>
            <section className="flex gap-5 w-full">
                <div className="w-full bg-it-light-primary rounded-md p-5 space-y-4">
                    <h2 className="text-2xl font-normal">Bio</h2>
                    <p className="text-xl font-extrabold">
                        <i>{tutor?.bio}</i>
                    </p>
                </div>
            </section>
        </main>
    );
};

export default DashboardPage;
