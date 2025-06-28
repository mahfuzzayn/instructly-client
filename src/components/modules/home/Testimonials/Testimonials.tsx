/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent } from "@/components/ui/card";
import "./Testimonials.css";
import React from "react";

const testimonialsData = [
    {
        name: "Sarah, Parent",
        comment:
            "This platform made it so easy to find a great math tutor for my son!",
    },
    {
        name: "David, Student",
        comment:
            "Thanks to this platform, I finally understand chemistry and my grades have improved so much!",
    },
    {
        name: "Aisha, Parent",
        comment:
            "We found an amazing English tutor for my daughter. The lessons are engaging and effective!",
    },
    {
        name: "Liam, Student",
        comment:
            "I was struggling with physics until I started using this site. Highly recommend it to other students!",
    },
    {
        name: "Priya, Parent",
        comment:
            "Fantastic service! The tutors are professional and really care about the students’ progress.",
    },
    {
        name: "Emma, Student",
        comment:
            "I love how easy it is to book sessions and find the perfect tutor for any subject I need help with.",
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials-section bg-gray-100 py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-it-medium-dark mb-16">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonialsData.map((review, index) => (
                        <Card key={index} className="bg-it-extra-light">
                            <CardContent className="pt-6">
                                <p className="italic font-medium text-[17px]">
                                    "{review.comment}"
                                </p>
                                <p className="text-[16px] font-semibold text-gray-700 mt-4">
                                    ⎯ {review.name}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
