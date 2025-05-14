"use client";

import { ITutor } from "@/types";
import Image from "next/image";
import React from "react";
import TutorBooking from "./TutorBooking";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const TutorDetails = ({ tutor }: { tutor: ITutor }) => {
    const { user } = useUser();

    return (
        <div className="my-10 flex justify-center mx-5 pt-10 pb-20">
            <section className="flex flex-col gap-6 max-w-[960px]">
                <div className="flex">
                    <Link href="/tutors">
                        <Button className="hover:bg-it-light-dark font-semibold">
                            <ArrowLeft /> Tutors
                        </Button>
                    </Link>
                </div>
                <h2 className="text-3xl">
                    Tutor Profile:{" "}
                    <span className="font-bold">{tutor?.user?.name}</span>
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
                        <h4 className="text-lg font-bold">Subjects Taught</h4>
                        <div className="mt-2">
                            {tutor?.subjects?.map((subject) => (
                                <li className="list-outside" key={subject?._id}>
                                    {subject?.name}
                                </li>
                            ))}
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
                                    <h4 className="font-semibold">
                                        {review?.student?.user?.name}
                                    </h4>
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
                                    <h4 className="font-semibold">{a?.day}</h4>
                                    <div className="flex gap-x-2">
                                        <p>Start Time: {a?.startTime}</p>
                                        <p>End Time: {a?.endTime}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
            </section>
        </div>
    );
};

export default TutorDetails;
