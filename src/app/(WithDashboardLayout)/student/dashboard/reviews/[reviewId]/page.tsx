import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getSingleReview } from "@/services/Review";
import { IReview } from "@/types";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ViewStudentReviewPage = async ({
    params,
}: {
    params: Promise<{ reviewId: string }>;
}) => {
    const { reviewId } = await params;
    const { data: review }: { data: IReview } = await getSingleReview(reviewId);

    return (
        <div className="max-w-[960px] mx-auto p-5">
            <Link href={`/student/dashboard/reviews`}>
                <Button className="hover:bg-it-light-dark font-semibold mt-5 mb-10">
                    <ArrowLeft /> Reviews
                </Button>
            </Link>
            <div className="flex gap-x-1 items-center">
                <h2 className="text-2xl font-bold">Review</h2>
                <p>({review?._id})</p>
            </div>
            <div className="space-y-3 mt-5">
                <div>
                    <span>Student Name: </span>
                    <span className="font-semibold">
                        {review?.student?.user?.name}
                    </span>
                </div>
                <div>
                    <span>Tutor Name: </span>
                    <span className="font-semibold">
                        {review?.tutor?.user?.name}
                    </span>
                </div>
                <div className="flex gap-x-1">
                    <span>Rating: </span>
                    <div className="flex gap-x-1 font-semibold">
                        <span>{review?.rating}</span>
                        <Rating
                            style={{ width: 80 }}
                            value={review?.rating}
                            readOnly
                        />
                    </div>
                </div>
                <div>
                    <p className="text-lg font-semibold">Comment</p>
                    <Separator className="my-2" />
                    <p className="font-normal text-justify leading-7">
                        {review?.comment}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ViewStudentReviewPage;
