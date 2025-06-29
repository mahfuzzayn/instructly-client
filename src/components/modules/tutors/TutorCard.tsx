"use client";

import { ITutor } from "@/types";
import Image from "next/image";
import React from "react";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./TutorCard.css";

const TutorCard = ({ tutor }: { tutor: ITutor }) => {
    return (
        <div
            className="tutor-card py-6 px-4 rounded-md border-[1px] border-[#fffff363]"
            style={{
                backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
            }}
        >
            <Image
                src={tutor?.profileUrl}
                height={600}
                width={1000}
                alt={`Profile Photo of ${tutor?.user?.name}`}
                className="h-[200px] mx-auto object-cover rounded-t-md"
            />
            <div className="space-y-4 p-4">
                <h2 className="text-2xl bg-it-medium-primary text-white p-1 rounded-md text-center font-bold">
                    {tutor?.user?.name}
                </h2>
                <div>
                    <h2 className="text-lg font-semibold mb-2">
                        Subjects Taught
                    </h2>
                    {tutor?.subjects.length > 0 ? (
                        <ul className="flex flex-wrap gap-2 mt-3">
                            {tutor?.subjects.slice(0, 5).map(
                                (subject) =>
                                    subject?.status === "active" && (
                                        <li key={subject?._id}>
                                            <p className="bg-it-medium-dark font-medium rounded-sm p-1 px-2 text-sm text-white">
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
                <div className="flex justify-start lg:justify-center !mt-12">
                    <Link href={`/tutors/${tutor?._id}`}>
                        <Button className="bg-it-secondary hover:bg-it-light-dark">
                            See Full Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TutorCard;
