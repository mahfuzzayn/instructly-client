import TutorDetails from "@/components/modules/tutors/TutorDetails";
import { getSingleTutor } from "@/services/Tutor";
import { ITutor } from "@/types";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ tutorId: string }>;
}) => {
    const { tutorId } = await params;
    const { data: tutor }: { data: ITutor } = await getSingleTutor(tutorId);

    return {
        title: `${
            tutor?.user?.name ? tutor?.user?.name : "Unknown"
        } ‣ Tutors ‣ Instructly`,
        description: `${
            tutor?.bio ||
            `Explore tutoring services offered by ${tutor?.user?.name}. ${tutor?.user?.name} is ready to help you succeed.`
        }`,
    };
};

const TutorDetailsPage = async ({
    params,
}: {
    params: Promise<{ tutorId: string }>;
}) => {
    const { tutorId } = await params;
    const { data: tutor } = await getSingleTutor(tutorId);

    if (!tutor) {
        redirect("/tutors");
    }

    return <TutorDetails tutor={tutor}></TutorDetails>;
};

export default TutorDetailsPage;
