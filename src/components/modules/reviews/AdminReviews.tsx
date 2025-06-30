/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IMeta, IReview } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Eye, EyeOffIcon, SquareArrowOutUpRight } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import { toast } from "sonner";
import { updateReviewStatus } from "@/services/Admin";

const AdminReviews = ({
    reviews,
    meta,
}: {
    reviews: IReview[];
    meta: IMeta;
}) => {
    const { user } = useUser();

    const handleUpdateReviewStatusByAdmin = async (
        reviewId: string,
        status: "visible" | "invisible"
    ) => {
        const toastId = toast.loading("Updating review status...");

        try {
            const updatedData = {
                isVisible: status === "visible" ? true : false,
            };

            const res = await updateReviewStatus(reviewId, updatedData);

            if (res.success) {
                toast.success(`Review has been changed to ${status}`, {
                    id: toastId,
                });
            } else {
                toast.warning("Failed to update review status", {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error("Failed to update review status", { id: toastId });
            return Error(error);
        }
    };

    const columns: ColumnDef<IReview>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.student?.user?.name}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "comment",
            header: "Comment",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.comment.slice(0, 30)}...
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "tutor",
            header: "Tutor",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.tutor?.user?.name}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "rating",
            header: "Rating",
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <p className="truncate">{row.original.rating}</p>
                    <Rating
                        style={{ width: 80 }}
                        value={row.original?.rating}
                        readOnly
                    />
                </div>
            ),
        },
        {
            accessorKey: "givenAt",
            header: "Given At",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        {moment(row.original.createdAt).format(
                            "h:mm A MMMM D, YYYY"
                        )}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-3">
                        <Link
                            href={`/${user?.role}/dashboard/reviews/${row.original._id}`}
                        >
                            <Button className="text-white hover:bg-it-light-dark">
                                View
                                <SquareArrowOutUpRight />
                            </Button>
                        </Link>
                        {row?.original?.isVisible ? (
                            <Button
                                className="text-white bg-yellow-600 hover:bg-yellow-700"
                                onClick={() =>
                                    handleUpdateReviewStatusByAdmin(
                                        row?.original?._id,
                                        "invisible"
                                    )
                                }
                            >
                                Hide
                                <EyeOffIcon />
                            </Button>
                        ) : (
                            <Button
                                className="text-white bg-it-medium-dark hover:bg-it-secondary"
                                onClick={() =>
                                    handleUpdateReviewStatusByAdmin(
                                        row?.original?._id,
                                        "visible"
                                    )
                                }
                            >
                                Unhide
                                <Eye />
                            </Button>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl text-it-medium-dark font-bold">
                    Manage Reviews
                </h1>
            </div>
            <ITTable columns={columns} data={reviews || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default AdminReviews;
