"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ITutor } from "@/types";
import Image from "next/image";
import Link from "next/link";
import userAvatar from "../../../../assets/images/user.png";
import tutorsImage from "../../../../assets/images/tutors.png";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./HeroSection.css";

const HeroSection = ({ tutors }: { tutors: ITutor[] }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [matchedSearch, setMatchedSearch] = useState<ITutor[] | []>([]);

    const handleSearchbar = (value: string) => {
        setSearchQuery(value.trim());

        const matchedByTutors = tutors.filter(
            (tutor) =>
                tutor?.user?.name
                    .toLowerCase()
                    .includes(value.trim().toLowerCase()) ||
                tutor?.subjects.some(
                    (subject) =>
                        subject?.name
                            .toLowerCase()
                            .includes(value.trim().toLowerCase()) ||
                        subject?.gradeLevel
                            .toLowerCase()
                            .includes(value.trim().toLowerCase()) ||
                        subject?.category
                            .toLowerCase()
                            .includes(value.trim().toLowerCase())
                )
        );

        setMatchedSearch(matchedByTutors);
    };

    const handleButtonSearch = () => {
        if (searchQuery.trim().length > 0) {
            router.push(`/tutors?searchQuery=${searchQuery}`);
        }
    };

    return (
        <section className="hero-section">
            <div className="text-it-medium-dark h-[620px] sm:h-[640px] relative pt-36">
                <div className="max-w-7xl mx-auto text-center px-6 relative z-[15]">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                        Find the Perfect Tutor for Your Needs
                    </h1>
                    <p className="text-lg mb-6 font-medium">
                        Search by subject, grade, or tutor name to connect with
                        qualified professionals.
                    </p>
                    <div className="flex justify-center relative">
                        <div className="w-full max-w-lg">
                            <Input
                                type="text"
                                placeholder="Search for tutors..."
                                className="bg-white text-black placeholder:text-gray-500 rounded-r-none"
                                onChange={(e) =>
                                    handleSearchbar(e.target.value)
                                }
                            />
                            {matchedSearch.length > 0 &&
                                searchQuery.trim().length > 0 && (
                                    <div className="absolute w-full rounded-xl max-w-lg top-10 backdrop-blur-[20px] border-[2px] border-[#ffffff4f] p-4 flex flex-col gap-y-2 mt-2">
                                        {matchedSearch.map((tutor) => (
                                            <Link
                                                href={`/tutors/${tutor?._id}`}
                                                key={tutor?._id}
                                                className="flex items-center gap-x-2 text-left bg-it-extra-light rounded-md text-gray-800 font-semibold cursor-pointer hover:text-it-secondary"
                                            >
                                                <Image
                                                    src={
                                                        tutor?.profileUrl ||
                                                        userAvatar
                                                    }
                                                    height={240}
                                                    width={240}
                                                    alt="Profile Image"
                                                    className="rounded-md rounded-r-none h-[42px] w-[56px] object-cover bg-cover"
                                                />
                                                {tutor?.user?.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                        </div>
                        <Button
                            onClick={handleButtonSearch}
                            className="bg-it-medium-dark text-white hover:bg-it-destructive rounded-l-none"
                        >
                            Search
                        </Button>
                    </div>
                </div>
                <div className="tutors-image-container absolute left-0 bottom-0 select-none pointer-events-none">
                    <Image
                        src={tutorsImage}
                        alt="Tutors Image"
                        className="mx-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
