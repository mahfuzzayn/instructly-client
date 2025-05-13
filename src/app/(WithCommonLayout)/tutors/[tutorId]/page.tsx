import TutorDetails from "@/components/modules/tutors/TutorDetails";
import { getSingleTutor } from "@/services/Tutor";
import { redirect } from "next/navigation";

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
