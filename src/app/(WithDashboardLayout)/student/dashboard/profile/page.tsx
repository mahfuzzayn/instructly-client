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
        <main className="flex flex-col items-start space-y-2 m-5">
            <div className="space-y-2 p-5 pb-0">
                <h2 className="text-3xl font-bold">
                    Welcome,{" "}
                    <span className="text-it-medium-dark">
                        {student?.user?.name}
                    </span>
                </h2>
                <p className="text-md">
                    Manage your student profile settings here!
                </p>
            </div>
            <StudentProfile student={student} subjects={subjects} />
        </main>
    );
};

export default ProfilePage;
