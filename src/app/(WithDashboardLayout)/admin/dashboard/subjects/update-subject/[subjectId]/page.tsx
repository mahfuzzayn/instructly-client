import UpdateSubjectFormByAdmin from "@/components/modules/subjects/admin/update-subject/UpdateSubjectForm";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/AuthService";
import { getSingleSubject } from "@/services/Subject";
import { ISubject } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ subjectId: string }>;
}) => {
    const { subjectId } = await params;
    const { data: subject }: { data: ISubject } = await getSingleSubject(
        subjectId
    );

    return {
        title: `${
            subject?.createdAt
                ? `Update Subject (${subject?._id.slice(
                      0,
                      3
                  )}...${subject?._id.slice(
                      subject?._id.length - 3,
                      subject?._id.length
                  )})`
                : "Invalid Subject"
        } ‣ Admin Dashboard ‣ Instructly`,
        description: `${
            subject?.createdAt
                ? `Update subject for to specialize in as an admin to better serve your students.`
                : "Invalid Subject, so we can't provide any description."
        }`,
    };
};

const UpdateSubjectPage = async ({
    params,
}: {
    params: Promise<{ subjectId: string }>;
}) => {
    const { subjectId } = await params;
    const { data: tutor } = await getMe();
    const { data: subject } = await getSingleSubject(subjectId);

    if (!subject) {
        return (
            <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
                <h2 className="text-2xl md:text-3xl text-it-medium-dark font-bold">
                    Invalid Subject ID
                </h2>
                <p className="text-lg text-center">
                    Subject ID:{" "}
                    <span className="font-semibold">{subjectId}</span>
                </p>
                <Link href="/admin/dashboard/subjects">
                    <Button className="bg-it-secondary hover:bg-it-light-dark font-semibold mb-5">
                        <ArrowLeft /> Subjects
                    </Button>
                </Link>
            </div>
        );
    }

    return <UpdateSubjectFormByAdmin tutor={tutor} subject={subject} />;
};

export default UpdateSubjectPage;
