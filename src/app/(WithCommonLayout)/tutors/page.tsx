import Tutors from "@/components/modules/tutors";
import FilterSidebar from "@/components/modules/tutors/filterSidebar";
import { getAllSubjects } from "@/services/Subject";
import { getAllTutors } from "@/services/Tutor";
import { IMeta, ITutor } from "@/types";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const TutorsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const query = await searchParams;

    const { data: tutors, meta }: { data: ITutor[]; meta: IMeta } =
        await getAllTutors(undefined, "6", query);
    const { data: subjects } = await getAllSubjects();

    return (
        <main className="my-10">
            <h1 className="text-3xl text-center font-extrabold mb-10">
                Explore Tutors of Instructly
            </h1>
            <div className="flex gap-8">
                <div className="w-full max-w-xs">
                    <FilterSidebar subjects={subjects} />
                </div>
                <div>
                    <Tutors tutors={tutors} meta={meta} />
                </div>
            </div>
        </main>
    );
};

export default TutorsPage;
