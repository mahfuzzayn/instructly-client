"use client";

import { ITutor } from "@/types";
import Image from "next/image";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TutorCard = ({ tutor }: { tutor: ITutor }) => {
    return (
        <div className="bg-it-light-primary py-6 px-4 rounded-md space-y-4">
            <Image
                src={tutor?.profileUrl}
                height={120}
                width={120}
                alt={`Profile Photo of ${tutor?.user?.name}`}
                className="rounded-full max-h-[120px] mx-auto object-cover"
            />
            <h2 className="text-xl text-center font-bold">
                {tutor?.user?.name}
            </h2>
            <div>
                <h2 className="text-lg font-semibold mb-2">Subjects Taught</h2>
                {tutor?.subjects.length > 0 ? (
                    <ul className="flex flex-wrap gap-x-8 gap-y-3 ml-6 mt-3">
                        {tutor?.subjects.map(
                            (subject) =>
                                subject?.status === "active" && (
                                    <li
                                        className="list-disc"
                                        key={subject?._id}
                                    >
                                        <p className="bg-it-medium-dark font-medium p-1 px-2 text-sm rounded-md text-white">
                                            {subject?.name}
                                        </p>
                                    </li>
                                )
                        )}
                    </ul>
                ) : (
                    <p className="mt-2 mb-4">
                        <i>No subjects were found!</i>
                    </p>
                )}
            </div>
            <h2 className="text-lg font-normal">
                Hourly Rate{" "}
                <span className="font-semibold">
                    {tutor?.hourlyRate} taka/hr
                </span>
            </h2>
            <div className="flex gap-x-2">
                <h2 className="text-lg font-normal flex items-center gap-x-2">
                    <p>Average Rating</p>
                    <p className="font-semibold">{tutor?.averageRating}</p>
                </h2>
                <Rating
                    style={{ maxWidth: 120 }}
                    value={tutor?.averageRating}
                    readOnly
                />
            </div>
            <div className="flex justify-center !mt-10">
                <Link href={`/tutors/${tutor?._id}`}>
                    <Button className="hover:bg-it-light-dark">
                        See Full Details
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default TutorCard;
