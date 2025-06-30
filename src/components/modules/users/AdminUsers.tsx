/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IAdmin, IMeta, IStudent, ITutor, IUser } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import { updateUserStatus } from "@/services/Admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminUsers = ({
    users,
    students,
    tutors,
    admins,
    meta,
}: {
    users: IUser[];
    students: IStudent[];
    tutors: ITutor[];
    admins: IAdmin[];
    meta: IMeta;
}) => {
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
            accessorKey: "profileUrl",
            header: "Picture",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 rounded-lg">
                            <AvatarImage
                                src={
                                    row?.original?.role === "student"
                                        ? students.find(
                                              (student) =>
                                                  student?.user?._id ===
                                                  row?.original?._id
                                          )?.profileUrl
                                        : row?.original?.role === "tutor"
                                        ? tutors.find(
                                              (tutor) =>
                                                  tutor?.user?._id ===
                                                  row?.original?._id
                                          )?.profileUrl
                                        : admins.find(
                                              (admin) =>
                                                  admin?.user?._id ===
                                                  row?.original?._id
                                          )?.profileUrl
                                }
                                height={120}
                                width={120}
                                className="pointer-events-none select-none"
                                alt={row?.original?.name}
                            />
                            <AvatarFallback className="bg-it-light-dark rounded-lg text-white font-bold">
                                {row?.original?.name
                                    ?.split(" ")
                                    .slice(0, 2)
                                    .map((name) => name[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                );
            },
        },
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
