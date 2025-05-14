import GiveReviewForm from "@/components/modules/reviews/GiveReviewForm";
import { getMe } from "@/services/AuthService";
import { getAllTutors } from "@/services/Tutor";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Give Review ‣ Student Dashboard ‣ Instructly",
    description:
        "Give reviews to tutor who really deservers an appreciation of their hard work.",
};

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
