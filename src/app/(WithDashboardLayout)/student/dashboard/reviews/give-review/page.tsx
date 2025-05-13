import GiveReviewForm from "@/components/modules/reviews/GiveReviewForm";
import { getMe } from "@/services/AuthService";
import { getAllTutors } from "@/services/Tutor";
import React from "react";

const SingleReviewPage = async () => {
    const { data: student } = await getMe();
    const { data: tutors } = await getAllTutors();

    return (
        <>
            <GiveReviewForm student={student} tutors={tutors} />
        </>
    );
};

export default SingleReviewPage;
