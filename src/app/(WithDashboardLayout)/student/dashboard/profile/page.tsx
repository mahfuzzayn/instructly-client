import StudentProfile from "@/components/modules/profile/student-profile/StudentProfile";
import { getMe } from "@/services/AuthService";
import { getAllSubjects } from "@/services/Subject";
import { IStudent } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Profile ‣ Student Dashboard ‣ Instructly",
    description:
        "Keep your profile up-to-date to ensure a seamless experience for both tutors and yourself.",
};

const ProfilePage = async () => {
    const { data: student }: { data: IStudent } = await getMe();
    const { data: subjects } = await getAllSubjects();

    return (
        <main className="space-y-2 m-5">
            <h2 className="text-3xl font-bold text-center">
                Welcome, {student?.user?.name}
            </h2>
            <p className="text-center">
                Manage your student profile settings here!
            </p>
            <StudentProfile student={student} subjects={subjects} />
        </main>
    );
};

export default ProfilePage;
