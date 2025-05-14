import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
    return (
        <section className="bg-it-extra-light py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
                <p className="text-lg mb-8">
                    Join our community of learners and educators. Sign up now!
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link href="/signup">
                        <Button className="bg-it-secondary text-white hover:bg-it-medium-dark">
                            Sign Up as a Student
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="bg-yellow-500 text-white hover:bg-yellow-700">
                            Register as a Tutor
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GetStarted;
