import ManageSubjects from "@/components/modules/subjects/my-subjects";
import { getMySubjects } from "@/services/Tutor";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Subjects ‣ Tutor Dashboard ‣ Instructly",
    description:
        "Add or edit subjects and courses you specialize in as a tutor to better serve your students.",
};

const SubjectsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data: subjects, meta } = await getMySubjects(page, "5");

    return (
        <>
            <ManageSubjects subjects={subjects} meta={meta} />
        </>
    );
};

export default SubjectsPage;
