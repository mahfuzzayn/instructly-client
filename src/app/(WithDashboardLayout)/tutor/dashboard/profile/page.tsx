import TutorProfile from "@/components/modules/profile/tutor-profile/TutorProfile";
import { getMe } from "@/services/AuthService";
import { ITutor } from "@/types";
import React from "react";

const ProfilePage = async () => {
    const { data: tutor }: { data: ITutor } = await getMe();

    return (
        <main className="flex flex-col items-start space-y-2 m-5">
            <div className="space-y-2 p-5 pb-0">
                <h2 className="text-3xl font-bold text-center">
                    Welcome,{" "}
                    <span className="text-it-medium-dark">
                        {tutor?.user?.name}
                    </span>
                </h2>
                <p className="text-md">
                    Manage your tutor profile settings here!
                </p>
            </div>
            <TutorProfile tutor={tutor} />
        </main>
    );
};

export default ProfilePage;
