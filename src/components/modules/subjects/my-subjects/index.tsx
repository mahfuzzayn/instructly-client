/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IMeta, ISubject } from "@/types";
import { ITTable } from "@/components/ui/core/ITTable";
import TablePagination from "@/components/ui/core/ITTable/TablePagination";
import moment from "moment";
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const ManageSubjects = ({
    subjects,
    meta,
}: {
    subjects: ISubject[];
    meta: IMeta;
}) => {
    const router = useRouter();
    const [selectedSubject, setSelectedSubject] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
            header: "Grade level",
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
                    <button
                        className="text-gray-500 hover:text-green-500"
                        title="Edit"
                        onClick={() =>
                            router.push(
                                `/tutor/dashboard/subjects/update-subject/${row.original._id}`
                            )
                        }
                    >
                        <Edit className="w-5 h-5" />
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-500"
                        title="Delete"
                        onClick={() => {
                            setSelectedSubject(row.original._id);
                            setIsDeleteModalOpen(true);
                        }}
                    >
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">Manage Subjects</h1>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() =>
                            router.push(
                                "/tutor/dashboard/subjects/create-subject"
                            )
                        }
                        size="sm"
                        className="hover:bg-it-medium-dark"
                    >
                        Create Subject <Plus />
                    </Button>
                </div>
                <DeleteModal
                    open={isDeleteModalOpen}
                    setIsOpen={setIsDeleteModalOpen}
                    subjectId={selectedSubject}
                />
            </div>
            <ITTable columns={columns} data={subjects || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default ManageSubjects;
