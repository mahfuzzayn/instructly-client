import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ ‣ Instructly",
    description:
        "Find answers to common questions about our platform, services, and policies to help you get started.",
};

const faqData = [
    {
        category: "Tutoring",
        questions: [
            {
                question: "How do I find a tutor?",
                answer: "To find a tutor, you can search by subject or browse our list of qualified tutors under the 'Find a Tutor' section.",
            },
            {
                question: "Can I cancel a session?",
                answer: "Yes, sessions can be canceled up to 24 hours in advance. Visit your dashboard to manage your bookings.",
            },
        ],
    },
    {
        category: "Payments",
        questions: [
            {
                question: "How are payments processed?",
                answer: "Payments are securely processed through our integrated payment gateway SSLCommerz with SSL encryption.",
            },
            {
                question: "Are refunds available?",
                answer: "Refunds are available if sessions are canceled at least 24 hours in advance or if the tutor does not meet expectations.",
            },
        ],
    },
    {
        category: "Account Management",
        questions: [
            {
                question: "How can I manage my subjects of interests?",
                answer: "Go to the Dashboard, then head over to profile option, upload your desired photo and apply the changes.",
            },
            {
                question: "Can I update my profile information?",
                answer: "Yes, you can update your profile by visiting the 'Account Settings' page on your dashboard.",
            },
        ],
    },
];

const faqPage = () => {
    return (
        <div className="max-w-4xl mx-auto mt-20 pb-24 px-5">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
                Frequently Asked Questions
            </h1>
            <div className="mt-10">
                {faqData.map((category, categoryIndex) => (
                    <div
                        key={categoryIndex}
                        className="mb-8 bg-it-medium-primary p-6 rounded-md"
                    >
                        <h2 className="text-xl font-semibold mb-4">
                            {category.category}
                        </h2>
                        <Accordion type="single" collapsible>
                            {category.questions.map((item, questionIndex) => (
                                <AccordionItem
                                    key={questionIndex}
                                    value={`${categoryIndex}-${questionIndex}`}
                                >
                                    <AccordionTrigger className="text-left">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default faqPage;
