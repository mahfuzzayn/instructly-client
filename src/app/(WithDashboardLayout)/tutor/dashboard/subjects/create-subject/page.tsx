import CreateSubjectForm from "@/components/modules/subjects/create-subject/CreateSubjectForm";
import { getMe } from "@/services/AuthService";
import React from "react";

const CreateSubjectPage = async () => {
    const { data: tutor } = await getMe();

    return (
        <>
            <CreateSubjectForm tutor={tutor} />
        </>
    );
};

export default CreateSubjectPage;
