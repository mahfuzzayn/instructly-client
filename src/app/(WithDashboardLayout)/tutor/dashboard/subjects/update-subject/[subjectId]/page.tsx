import UpdateSubjectForm from "@/components/modules/subjects/update-subject/UpdateSubjectForm";
import { getMe } from "@/services/AuthService";
import { getSingleSubject } from "@/services/Subject";
import React from "react";

const UpdateSubjectPage = async ({
    params,
}: {
    params: Promise<{ subjectId: string }>;
}) => {
    const { subjectId } = await params;
    const { data: tutor } = await getMe();
    const { data: subject } = await getSingleSubject(subjectId);

    return (
        <>
            <UpdateSubjectForm tutor={tutor} subject={subject} />
        </>
    );
};

export default UpdateSubjectPage;
