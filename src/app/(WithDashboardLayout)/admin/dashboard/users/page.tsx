import AdminUsers from "@/components/modules/users/AdminUsers";
import { getAllAdmins, getAllUsers } from "@/services/Admin";
import { getAllStudents } from "@/services/Student";
import { getAllTutors } from "@/services/Tutor";
import { IAdmin, IMeta, IStudent, ITutor, IUser } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Users ‣ Admin Dashboard ‣ Instructly",
    description: "View users of instructly's and know about them as an admin.",
};

const AdminUsersPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data: users, meta }: { data: IUser[]; meta: IMeta } =
        await getAllUsers("10", page);
    const { data: students }: { data: IStudent[] } = await getAllStudents();
    const { data: tutors }: { data: ITutor[] } = await getAllTutors();
    const { data: admins }: { data: IAdmin[] } = await getAllAdmins();

    return (
        <AdminUsers
            users={users}
            students={students}
            tutors={tutors}
            admins={admins}
            meta={meta}
        />
    );
};

export default AdminUsersPage;
