import CreateSubjectForm from "@/components/modules/subjects/tutor/create-subject/CreateSubjectForm";
import { getMe } from "@/services/AuthService";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Subject ‣ Tutor Dashboard ‣ Instructly",
    description:
        "Expand your tutoring portfolio by adding new subjects or courses to attract more students.",
};

const CreateSubjectPage = async () => {
    const { data: tutor } = await getMe();

    return <CreateSubjectForm tutor={tutor} />;
};

export default CreateSubjectPage;
