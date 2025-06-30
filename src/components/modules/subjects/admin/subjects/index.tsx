/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, RotateCcw, Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IMeta, ISubject, SubjectStatus } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { updateSubjectStatus } from "@/services/Admin";

const AdminManageSubjects = ({
    subjects,
    meta,
}: {
    subjects: ISubject[];
    meta: IMeta;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleUpdateSubjectStatusByAdmin = async (
        subjectId: string,
        status: SubjectStatus.ACTIVE | SubjectStatus.DISCONTINUED
    ) => {
        const toastId = toast.loading("Updating subject status...");

        try {
            const updatedData = {
                status,
            };

            const res = await updateSubjectStatus(subjectId, updatedData);

            if (res.success) {
                toast.success(`Subject status changed to ${status}`, {
                    id: toastId,
                });
            } else {
                toast.warning("Failed to update subject status", {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error("Failed to update subject status", { id: toastId });
            return Error(error);
        }
    };

    const handleSearchQuery = (
        query: string,
        value: string | number,
        remove?: boolean
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!remove) {
            params.set(query, value.toString());
        } else {
            params.delete(query);
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const columns: ColumnDef<ISubject>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">{row.original.name}</span>
                </div>
            ),
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">{row.original.category}</span>
                </div>
            ),
        },
        {
            accessorKey: "gradeLevel",
            header: ({ column }) => (
                <button
                    onClick={() => {
                        column.toggleSorting();

                        if (column.getIsSorted() === "asc") {
                            handleSearchQuery("sort", "-gradeLevel");
                        } else if (column.getIsSorted() === "desc") {
                            handleSearchQuery("sort", "", true);
                        } else {
                            handleSearchQuery("sort", "gradeLevel");
                        }
                    }}
                >
                    Grade Level
                    {column.getIsSorted() === "asc" && "🔼"}
                    {column.getIsSorted() === "desc" && "🔽"}
                </button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">{row.original.gradeLevel}</span>
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
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
                        href={`/admin/dashboard/subjects/update-subject/${row.original._id}`}
                    >
                        <Button className="bg-green-600 hover:bg-green-700">
                            Edit
                            <Edit className="w-5 h-5" />
                        </Button>
                    </Link>
                    {row?.original?.status === SubjectStatus.ACTIVE ? (
                        <Button
                            className="bg-yellow-600 hover:bg-yellow-700"
                            onClick={() =>
                                handleUpdateSubjectStatusByAdmin(
                                    row?.original?._id,
                                    SubjectStatus.DISCONTINUED
                                )
                            }
                        >
                            Discontinue
                            <Trash className="w-5 h-5" />
                        </Button>
                    ) : (
                        <Button
                            className="bg-it-secondary hover:bg-it-light-dark"
                            onClick={() =>
                                handleUpdateSubjectStatusByAdmin(
                                    row?.original?._id,
                                    SubjectStatus.ACTIVE
                                )
                            }
                        >
                            Active
                            <RotateCcw className="w-5 h-5" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl text-it-medium-dark font-bold">
                    Manage Subjects
                </h1>
            </div>
            <ITTable columns={columns} data={subjects || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default AdminManageSubjects;
