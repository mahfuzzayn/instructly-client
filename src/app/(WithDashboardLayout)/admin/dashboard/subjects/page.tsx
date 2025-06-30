import AdminManageSubjects from "@/components/modules/subjects/admin/subjects";
import { getAllSubjectsByAdmin } from "@/services/Admin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Subjects ‣ Admin Dashboard ‣ Instructly",
    description:
        "Add or edit subjects and courses you specialize in as a tutor to better serve your students.",
};

const AdminSubjectsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const query = await searchParams;
    const { data: subjects, meta } = await getAllSubjectsByAdmin(
        query?.page as string,
        "5",
        query
    );

    return (
        <>
            <AdminManageSubjects subjects={subjects} meta={meta} />
        </>
    );
};

export default AdminSubjectsPage;
