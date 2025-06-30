import AdminProfile from "@/components/modules/profile/admin-profile/AdminProfile";
import { getMe } from "@/services/AuthService";
import { IAdmin } from "@/types";
import React from "react";

const ProfilePage = async () => {
    const { data: admin }: { data: IAdmin } = await getMe();

    return (
        <main className="flex flex-col items-start space-y-2 m-5">
            <div className="space-y-2 p-5 pb-0">
                <h2 className="text-3xl font-bold text-center">
                    Welcome,{" "}
                    <span className="text-it-medium-dark">
                        {admin?.user?.name}
                    </span>
                </h2>
                <p className="text-md">
                    Manage your tutor profile settings here!
                </p>
            </div>
            <AdminProfile admin={admin} />
        </main>
    );
};

export default ProfilePage;
