/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IMeta, IUser } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import { updateUserStatus } from "@/services/Admin";

const AdminUsers = ({ users, meta }: { users: IUser[]; meta: IMeta }) => {
    const handleUserUpdateByAdmin = async (
        userId: string,
        status: "activate" | "deactivate"
    ) => {
        const toastId = toast.loading("Updating user status...");

        try {
            const updatedData = {
                isActive: status === "activate" ? true : false,
            };

            const res = await updateUserStatus(userId, updatedData);

            if (res.success) {
                toast.success(`User has been ${status}d`, {
                    id: toastId,
                });
            } else {
                toast.warning(`Failed to to update user status`, {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error("Failed to update user status", { id: toastId });
            return Error(error);
        }
    };

    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original?.name}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.email}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "userId",
            header: "User Id",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original?._id.slice(0, 5)}...
                        {row.original?._id.slice(
                            row.original?._id.length - 5,
                            row.original?._id.length
                        )}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "CreatedAt At",
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
                        {row?.original?.isActive ? (
                            <Button
                                className="text-white bg-yellow-600 hover:bg-yellow-700"
                                title="Deactivate"
                                onClick={() =>
                                    handleUserUpdateByAdmin(
                                        row?.original?._id,
                                        "deactivate"
                                    )
                                }
                            >
                                Deactivate
                                <UserX />
                            </Button>
                        ) : (
                            <Button
                                className="text-white bg-it-primary hover:bg-it-light-dark"
                                title="Activate"
                                onClick={() =>
                                    handleUserUpdateByAdmin(
                                        row?.original?._id,
                                        "activate"
                                    )
                                }
                            >
                                Activate
                                <UserCheck />
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
                    Manage Users
                </h1>
            </div>
            <ITTable columns={columns} data={users || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default AdminUsers;
