"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";
import { IBooking, IMeta, IPaymentStatus, IStatus } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { ITStatusBadge } from "@/components/ui/core/ITStatusBadge/ITStatusBadge";
import { ITPaymentStatusBadge } from "@/components/ui/core/ITPaymentStatusBadge/ITPaymentStatusBadge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";

const ManageAdminBookings = ({
    bookings,
    meta,
}: {
    bookings: IBooking[];
    meta: IMeta;
}) => {
    const { user } = useUser();
    const columns: ColumnDef<IBooking>[] = [
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        {row.original.price}{" "}
                        <span className="font-semibold">Taka</span>
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "totalHours",
            header: "Total Hours",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.totalHours}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        <ITStatusBadge
                            status={row.original.status as IStatus}
                        />
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "paymentStatus",
            header: "Payment Status",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        <ITPaymentStatusBadge
                            status={
                                row.original.paymentStatus as IPaymentStatus
                            }
                        />
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "created",
            header: "Booking Date",
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
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        {moment(row.original.updatedAt).format(
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
                    <Link
                        href={`/${user?.role}/dashboard/bookings/${row.original._id}`}
                    >
                        <Button className="text-white hover:bg-it-light-dark">
                            View
                            <SquareArrowOutUpRight />
                        </Button>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="mb-4">
                <h1 className="text-2xl text-it-medium-dark font-bold">
                    Manage Bookings
                </h1>
            </div>
            <ITTable columns={columns} data={bookings || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default ManageAdminBookings;
