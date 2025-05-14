import UpdateSubjectForm from "@/components/modules/subjects/update-subject/UpdateSubjectForm";
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
        } ‣ Tutor Dashboard ‣ Instructly`,
        description: `${
            subject?.createdAt
                ? `Update subject for to specialize in as a tutor to better serve your students.`
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
                <h2 className="text-2xl font-bold">Invalid Subject ID</h2>
                <p>
                    Subject ID:{" "}
                    <span className="font-semibold">{subjectId}</span>
                </p>
                <Link href="/student/dashboard/subjects">
                    <Button className="hover:bg-it-light-dark font-semibold mb-5">
                        <ArrowLeft /> Subjects
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-[960px]">
            <UpdateSubjectForm tutor={tutor} subject={subject} />
        </div>
    );
};

export default UpdateSubjectPage;
