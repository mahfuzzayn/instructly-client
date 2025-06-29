import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import teamImg1 from "@/assets/images/team/mahfuz-transparent.png";
import teamImg2 from "@/assets/images/team/raiyan-transparent.png";
import teamImg3 from "@/assets/images/team/kashem-transparent.png";
import teamImg4 from "@/assets/images/team/arif-transparent.png";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Us ‣ Instructly",
    description:
        "Discover our story, mission, and values as we strive to connect students and tutors for a better learning experience.",
};

const aboutData = {
    mission:
        "Our mission is to bridge the gap between students and qualified tutors by providing a reliable platform for learning and growth.",
    team: [
        {
            name: "Mahfuz Zayn",
            role: "Founder & CEO",
            image: teamImg1,
            description:
                "Passionate about education and technology, Mahfuz founded Instructly to make quality tutoring accessible to everyone.",
        },
        {
            name: "Mushfique Raiyan",
            role: "COO",
            image: teamImg2,
            description:
                "An operational strategist, Mushfique ensures the smooth execution of Instructly's vision and drives overall business growth.",
        },
        {
            name: "KSH Sami",
            role: "DevOps Engineer",
            image: teamImg3,
            description:
                "Specializing in system reliability and efficiency, Sakkif manages the infrastructure to ensure seamless platform performance.",
        },
        {
            name: "Mujahidul Islam",
            role: "Frontend Developer",
            image: teamImg4,
            description:
                "With an eye for design and usability, Mujahidul crafts engaging and intuitive interfaces for the platform.",
        },
    ],
    successStories: [
        {
            title: "A Student's Triumph",
            story: "Emily improved her grades in math from a C to an A with the help of a dedicated tutor from our platform.",
        },
        {
            title: "A Tutor's Growth",
            story: "Michael built his tutoring career through Instructly, helping dozens of students while earning a stable income.",
        },
    ],
    vision: "Our vision is to expand Instructly into a global platform, covering a wider range of subjects and languages, and fostering a community of lifelong learners.",
};

const AboutUsPage = () => {
    return (
        <div className="max-w-6xl mx-auto pt-36 mb-40 px-6">
            <h1 className="text-3xl md:text-5xl font-bold text-it-medium-dark text-center mb-8">
                About Us
            </h1>
            <Card
                className="mb-8"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl text-it-secondary">Mission Statement</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{aboutData.mission}</p>
                </CardContent>
            </Card>
            <Card
                className="mb-8"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl text-it-secondary">Meet the Team</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {aboutData.team.map((member, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-4 bg-it-secondary relative overflow-hidden"
                            >
                                <div className="relative z-[10] space-y-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-it-medium-primary font-semibold">
                                            {member.role}
                                        </p>
                                    </div>
                                    <p className="text-gray-200 max-w-[350px]">
                                        {member.description}
                                    </p>
                                </div>
                                <div className="relative z-[5]">
                                    <Image
                                        src={member.image}
                                        alt={`Member Image ${index + 1}`}
                                        className="max-w-[200px] absolute -top-[120px] right-0 bg-right object-cover w-full pointer-events-none"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card
                className="mb-8"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl text-it-secondary">Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                    {aboutData.successStories.map((story, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-lg font-semibold">
                                {story.title}
                            </h3>
                            <p>{story.story}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card
                className=""
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <CardHeader>
                    <CardTitle className="text-xl text-it-secondary">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{aboutData.vision}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AboutUsPage;
