import AdminUsers from "@/components/modules/users/AdminUsers";
import { getAllUsers } from "@/services/Admin";
import { IMeta, IUser } from "@/types";
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

    return <AdminUsers users={users} meta={meta} />;
};

export default AdminUsersPage;
