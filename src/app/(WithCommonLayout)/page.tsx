import HeroSection from "@/components/modules/home/HeroSection/HeroSection";
import KeyFeatures from "@/components/modules/home/KeyFeatures/KeyFeatures";
import Testimonials from "@/components/modules/home/Testimonials/Testimonials";
import GetStarted from "@/components/modules/home/GetStarted/GetStarted";
import { getAllTutors } from "@/services/Tutor";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Instructly",
    description:
        "Explore our platform to connect with expert tutors and embark on a personalized learning journey.",
};

const HomePage = async () => {
    const { data: tutors } = await getAllTutors();

    return (
        <div className="min-h-screen bg-gray-50">
            <HeroSection tutors={tutors} />
            <KeyFeatures />
            <Testimonials />
            <GetStarted />
        </div>
    );
};

export default HomePage;
