import AdminReviews from "@/components/modules/reviews/AdminReviews";
import { getAllReviews } from "@/services/Review";
import { IMeta, IReview } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Reviews ‣ Admin Dashboard ‣ Instructly",
    description:
        "View reviews of instructly's tutors and understand your improvement as an admin.",
};

const AdminReviewsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data: reviews, meta }: { data: IReview[]; meta: IMeta } =
        await getAllReviews("10", page);

    return <AdminReviews reviews={reviews} meta={meta} />
};

export default AdminReviewsPage;
