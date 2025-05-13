import TutorProfile from "@/components/modules/profile/tutor-profile/TutorProfile";
import { getMe } from "@/services/AuthService";
import { ITutor } from "@/types";
import React from "react";

const ProfilePage = async () => {
    const { data: tutor }: { data: ITutor } = await getMe();

    return (
        <main className="space-y-2 m-5 mx-auto">
            <h2 className="text-3xl font-bold text-center">Welcome, {tutor?.user?.name}</h2>
            <p className="text-center">Manage your tutor profile settings here!</p>
            <TutorProfile tutor={tutor} />
        </main>
    );
};

export default ProfilePage;
