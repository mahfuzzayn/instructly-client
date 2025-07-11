import HeroSection from "@/components/modules/home/HeroSection/HeroSection";
import KeyFeatures from "@/components/modules/home/KeyFeatures/KeyFeatures";
import Testimonials from "@/components/modules/home/Testimonials/Testimonials";
import GetStarted from "@/components/modules/home/GetStarted/GetStarted";
import { getAllTutors } from "@/services/Tutor";
import { Metadata } from "next";
import { getAllSubjects } from "@/services/Subject";
import Subjects from "@/components/modules/home/Subjects/Subjects";
import Tutors from "@/components/modules/home/Tutors/Tutors";
import Newsletter from "@/components/modules/home/Newsletter/Newsletter";
import Blogs from "@/components/modules/home/Blogs/Blogs";

export const metadata: Metadata = {
    title: "Instructly",
    description:
        "Explore our platform to connect with expert tutors and embark on a personalized learning journey.",
};

const HomePage = async () => {
    const { data: tutors } = await getAllTutors();
    const { data: subjects } = await getAllSubjects();

    return (
        <div className="min-h-screen bg-gray-50">
            <HeroSection tutors={tutors} />
            <Subjects subjects={subjects} />
            <Tutors tutors={tutors} />
            <KeyFeatures />
            <Testimonials />
            <GetStarted />
            <Blogs />
            <Newsletter />
        </div>
    );
};

export default HomePage;
