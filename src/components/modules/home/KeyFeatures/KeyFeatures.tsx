import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, DollarSign, UserCheck } from "lucide-react";
import React from "react";

const KeyFeatures = () => {
    return (
        <section className="py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl font-bold mb-10">Why Choose Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <BadgeCheck className="text-blue-600 h-12 w-12 mx-auto mb-4" />
                            <CardTitle className="mt-4">
                                Verified Profiles
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                All our tutors are vetted to ensure quality and
                                expertise.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <DollarSign className="text-green-600 h-12 w-12 mx-auto mb-4" />
                            <CardTitle className="mt-4">
                                Secure Payments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Pay securely through our platform for complete
                                peace of mind.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <UserCheck className="text-yellow-600 h-12 w-12 mx-auto mb-4" />
                            <CardTitle className="mt-4">
                                Find Tutors Fast
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Quickly locate the perfect tutor based on your
                                preferences.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
