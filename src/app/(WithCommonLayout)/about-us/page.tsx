import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

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
            description:
                "Passionate about education and technology, John founded Instructly to make quality tutoring accessible to everyone.",
        },
        {
            name: "Mushfique Raiyan",
            role: "COO",
            description:
                "With a background in software development, Jane leads the technical innovation behind the platform.",
        },
        {
            name: "Sakkif Hossain Rafid",
            role: "Devops Engineer",
            description:
                "With a background in software development, Jane leads the technical innovation behind the platform.",
        },
        {
            name: "Mujahidul Islam",
            role: "Frontend Developer",
            description:
                "With a background in software development, Jane leads the technical innovation behind the platform.",
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
        <div className="max-w-6xl mx-auto pt-20 mb-40 px-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8">
                About Us
            </h1>
            <Card className="mb-8 bg-it-medium-primary">
                <CardHeader>
                    <CardTitle className="text-xl">Mission Statement</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{aboutData.mission}</p>
                </CardContent>
            </Card>
            <Card className="mb-8 bg-it-medium-primary">
                <CardHeader>
                    <CardTitle className="text-xl">Meet the Team</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {aboutData.team.map((member, index) => (
                            <div key={index} className="border rounded-lg p-4">
                                <h3 className="text-lg font-bold">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-it-medium-dark font-semibold">
                                    {member.role}
                                </p>
                                <p>{member.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="mb-8 bg-it-medium-primary">
                <CardHeader>
                    <CardTitle className="text-xl">Success Stories</CardTitle>
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
            <Card className="bg-it-medium-primary">
                <CardHeader>
                    <CardTitle className="text-xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{aboutData.vision}</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AboutUsPage;
