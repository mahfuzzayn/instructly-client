"use client";

import { ITutor } from "@/types";
import Image from "next/image";
import React from "react";
import TutorBooking from "./TutorBooking";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "@/components/ui/separator";

const TutorDetails = ({ tutor }: { tutor: ITutor }) => {
    const { user } = useUser();

    return (
        <div className="flex justify-center pt-36 pb-24 m-10">
            <section className="flex flex-col lg:flex-row gap-y-12 gap-20 max-w-[1920px]">
                <div className="space-y-4">
                    <div className="flex mb-6">
                        <Link href="/tutors">
                            <Button className="bg-it-secondary hover:bg-it-light-dark font-semibold">
                                <ArrowLeft /> Tutors
                            </Button>
                        </Link>
                    </div>
                    <h2 className="text-3xl">
                        Tutor Profile:{" "}
                        <span className="text-it-medium-dark font-bold">
                            {tutor?.user?.name}
                        </span>
                    </h2>
                    <Image
                        src={tutor?.profileUrl}
                        height={200}
                        width={200}
                        alt={tutor?.user?.name}
                        className="rounded-3xl"
                    />
                    <div>
                        <h4 className="text-lg font-bold">Bio</h4>
                        <span className="border-2 border-it-medium-dark"></span>
                        <p>{tutor?.bio}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-lg font-bold">
                                Subjects Taught
                            </h4>
                            <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                                {tutor?.subjects?.map(
                                    (subject) =>
                                        subject?.status === "active" && (
                                            <li
                                                className="list-none"
                                                key={subject?._id}
                                            >
                                                <p className="h-full flex justify-center items-center bg-it-medium-dark font-medium rounded-sm py-1 px-2 text-sm text-white">
                                                    {subject?.name}
                                                </p>
                                            </li>
                                        )
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h4 className="text-lg font-bold">Hourly Rate</h4>
                            <p>
                                <span className="bg-it-destructive rounded-md p-2 font-bold text-white">
                                    {tutor?.hourlyRate} taka/hr
                                </span>
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">Reviews</h4>
                            <div className="space-y-4 mt-2">
                                {tutor?.reviews?.map((review) => (
                                    <div
                                        key={review?._id}
                                        className="bg-it-accent p-2 px-4 rounded-sm"
                                    >
                                        <div className="flex gap-x-2">
                                            <h4 className="font-semibold">
                                                {review?.student?.user?.name}
                                            </h4>
                                            <span className="font-medium">
                                                ({review?.rating})
                                            </span>
                                            <Rating
                                                style={{ maxWidth: 60 }}
                                                value={review?.rating}
                                                readOnly
                                            />
                                        </div>
                                        <p>{review?.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">Availability</h4>
                            <div className="space-y-4 mt-2">
                                {tutor?.availability.map((a) => (
                                    <div
                                        key={a?._id}
                                        className="bg-it-secondary text-white p-2 px-4 rounded-sm"
                                    >
                                        <h4 className="font-semibold">
                                            {a?.day}
                                        </h4>
                                        <div className="flex gap-x-2">
                                            <p>Start Time: {a?.startTime}</p>
                                            <p>End Time: {a?.endTime}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block">
                    <Separator
                        orientation="vertical"
                        className="bg-it-light-primary"
                    />
                </div>
                <div>
                    {user && user?.role === "student" ? (
                        <TutorBooking tutor={tutor} />
                    ) : (
                        <p className="text-it-medium-dark text-center mt-10 mb-5">
                            Want to Book this tutor?{" "}
                            <Link
                                href={`/login?redirectPath=/tutors/${tutor?._id}`}
                                className="font-semibold underline"
                            >
                                Login
                            </Link>{" "}
                            {user?.role === "tutor" && "as a student"} first
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default TutorDetails;
