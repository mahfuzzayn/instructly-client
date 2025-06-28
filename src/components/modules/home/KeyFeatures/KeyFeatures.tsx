import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, BookUser, DollarSign, UserCheck } from "lucide-react";
import "./KeyFeatures.css";
import React from "react";

const keyFeaturesData = [
    {
        title: "Verified Profiles",
        icon: BadgeCheck,
        description:
            "All our tutors are vetted to ensure quality and expertise.",
    },
    {
        title: "Quality Education",
        icon: BookUser,
        description: "Get the best quality education based on your location.",
    },
    {
        title: "Secure Payments",
        icon: DollarSign,
        description:
            "Pay securely through our platform for complete peace of mind.",
    },
    {
        title: "Find Tutors Fast",
        icon: UserCheck,
        description:
            "Quickly locate the perfect tutor based on your preferences.",
    },
];

const KeyFeatures = () => {
    return (
        <section className="key-features-section py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-it-medium-dark mb-16">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {keyFeaturesData.map((feature, index) => (
                        <Card
                            key={index}
                            className="bg-it-extra-light hover:bg-it-primary transition-all group"
                        >
                            <CardHeader>
                                <feature.icon className="text-it-primary group-hover:text-white transition-all h-12 w-12 mx-auto mb-4" />
                                <CardTitle className="mt-4 group-hover:text-white">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="group-hover:text-white">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
