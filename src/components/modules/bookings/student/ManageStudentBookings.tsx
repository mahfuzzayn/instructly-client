"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { IBooking, IMeta, IPaymentStatus, IStatus } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { ITStatusBadge } from "@/components/ui/core/ITStatusBadge/ITStatusBadge";
import { ITPaymentStatusBadge } from "@/components/ui/core/ITPaymentStatusBadge/ITPaymentStatusBadge";
import StudentBookingStatusChange from "./StudentBookingStatusChange";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import StudentInitiatePayment from "./StudentInitiatePayment";

const ManageStudentBookings = ({
    bookings,
    meta,
}: {
    bookings: IBooking[];
    meta: IMeta;
}) => {
    const { user } = useUser();
    const router = useRouter();
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
                    <Button
                        className="text-white hover:bg-it-light-dark"
                        title="View"
                        onClick={() =>
                            router.push(
                                `/${user?.role}/dashboard/bookings/${row.original._id}`
                            )
                        }
                    >
                        View
                        <SquareArrowOutUpRight />
                    </Button>
                    {row.original.paymentStatus !== "completed" &&
                        row.original.status === "waiting_for_payment" && (
                            <StudentInitiatePayment booking={row.original} />
                        )}
                    {row.original.status !== "pending_approval" &&
                        row.original.status !== "canceled_by_student" &&
                        row.original.status !== "canceled_by_tutor" &&
                        row.original.status !== "completed" &&
                        row.original.paymentStatus !== "completed" && (
                            <StudentBookingStatusChange
                                booking={row.original}
                            />
                        )}
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

export default ManageStudentBookings;
