"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IMeta, IReview } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const MyReviews = ({ reviews, meta }: { reviews: IReview[]; meta: IMeta }) => {
    const { user } = useUser();
    const router = useRouter();

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
                        <Button
                            className="text-white hover:bg-it-primary"
                            title="View"
                            onClick={() =>
                                router.push(
                                    `/${user?.role}/dashboard/reviews/${row.original._id}`
                                )
                            }
                        >
                            View
                            <SquareArrowOutUpRight />
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">My Reviews</h1>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() =>
                            router.push(
                                "/student/dashboard/reviews/give-review"
                            )
                        }
                        size="sm"
                        className="hover:bg-it-medium-dark"
                    >
                        Give Review <Plus />
                    </Button>
                </div>
            </div>
            <ITTable columns={columns} data={reviews || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default MyReviews;
