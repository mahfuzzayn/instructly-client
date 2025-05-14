/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

const Testimonials = () => {
    return (
        <section className="bg-gray-100 py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl font-bold mb-10">What Our Users Say</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="pt-6">
                            <p className="italic">
                                "This platform made it so easy to find a great
                                math tutor for my son!"
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                — Sarah, Parent
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="italic">
                                "I love how secure and professional the process
                                is. Highly recommend!"
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                — James, Tutor
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="italic">
                                "Thanks to this platform, I found the perfect
                                science tutor. A+!"
                            </p>
                            <p className="text-sm text-gray-500 mt-4">
                                — Aria, Student
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
