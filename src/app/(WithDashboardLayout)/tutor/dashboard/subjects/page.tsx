import ManageSubjects from "@/components/modules/subjects/my-subjects";
import { getMySubjects } from "@/services/Tutor";
import React from "react";

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
