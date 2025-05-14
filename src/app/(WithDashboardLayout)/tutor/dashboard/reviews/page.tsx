import MyReviews from "@/components/modules/reviews/MyReviews";
import { getMyReviews } from "@/services/Review";
import { IMeta, IReview } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Reviews ‣ Tutor Dashboard ‣ Instructly",
    description:
        "View reviews of your's to gain confidence and to understand your improvement as a tutor.",
};

const TutorReviewsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data: reviews, meta }: { data: IReview[]; meta: IMeta } =
        await getMyReviews("10", page);

    return <MyReviews reviews={reviews} meta={meta}></MyReviews>;
};

export default TutorReviewsPage;
