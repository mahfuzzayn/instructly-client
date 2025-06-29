import Tutors from "@/components/modules/tutors";
import FilterSidebar from "@/components/modules/tutors/filterSidebar";
import { getAllSubjects } from "@/services/Subject";
import { getAllTutors } from "@/services/Tutor";
import { IMeta, ITutor } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Tutors ‣ Instructly",
    description:
        "Browse our list of qualified tutors across various subjects to find the perfect match for your learning needs.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const TutorsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const query = await searchParams;

    const { data: tutors, meta }: { data: ITutor[]; meta: IMeta } =
        await getAllTutors(undefined, "6", query);
    const { data: subjects } = await getAllSubjects();

    return (
        <main className="pt-36 pb-32 max-w-[1980px] mx-auto">
            <h1 className="text-3xl md:text-5xl text-center font-bold text-it-medium-dark mb-16">
                Explore Tutors of Instructly
            </h1>
            <div className="lg:flex gap-8">
                <div className="w-full max-w-xs bg-it-light-dark lg:ml-6 lg:rounded-r-md">
                    <FilterSidebar subjects={subjects} />
                </div>
                <div className="w-full">
                    <Tutors tutors={tutors} meta={meta} />
                </div>
            </div>
        </main>
    );
};

export default TutorsPage;
