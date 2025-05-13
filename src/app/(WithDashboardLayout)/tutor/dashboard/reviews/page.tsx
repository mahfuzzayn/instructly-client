import MyReviews from "@/components/modules/reviews/MyReviews";
import { getMyReviews } from "@/services/Review";
import { IMeta, IReview } from "@/types";
import React from "react";

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
