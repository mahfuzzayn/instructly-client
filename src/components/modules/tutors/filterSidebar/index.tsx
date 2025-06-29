"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { days } from "@/constants";
import { ISubject } from "@/types";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortByOptions = [
    {
        value: "-earnings",
        label: "Relevance",
    },
    {
        value: "-averageRating",
        label: "Rating",
    },
    {
        value: "hourlyRate",
        label: "Price (low to high)",
    },
    {
        value: "-hourlyRate",
        label: "Price (high to low)",
    },
    {
        value: "-createdAt",
        label: "Newest",
    },
];

export default function FilterSidebar({ subjects }: { subjects: ISubject[] }) {
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
    const [hourlyRate, setHourlyRate] = useState([0]);
    const [rating, setRating] = useState<number | string>("All");
    const [location, setLocation] = useState<string>("Set None");
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearchQuery = (query: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(query, value.toString());

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const handleSubjectChange = (id: string) => {
        let updatedSubjects = [...selectedSubjects];
        if (updatedSubjects.includes(id)) {
            updatedSubjects = updatedSubjects.filter(
                (subjectId) => subjectId !== id
            );
        } else {
            updatedSubjects.push(id);
        }
        setSelectedSubjects(updatedSubjects);
        handleSearchQuery("subjects", updatedSubjects.join(","));
    };

    const handleDaysChange = (day: string) => {
        let updatedDays = [...selectedDays];
        if (updatedDays.includes(day)) {
            updatedDays = updatedDays.filter((d) => d !== day);
        } else {
            updatedDays.push(day);
        }
        setSelectedDays(updatedDays);
        handleSearchQuery("availability", updatedDays.join(","));
    };

    const handleSortByChange = (value: string) => {
        if (value === sortBy) {
            setSortBy("");
            handleSearchQuery("sort", "");
        } else {
            setSortBy(value);
            handleSearchQuery("sort", value);
        }
    };

    return (
        <section className="filter-products-section">
            <div
                className={`fixed top-0 z-[1020] ${
                    isFilterMenuOpen
                        ? "left-[0px]"
                        : "left-[-400px]"
                } overflow-y-scroll lg:overflow-y-auto lg:static p-6 h-full space-y-4 w-[300px] lg:w-auto bg-it-light-dark text-white z-[5] transition-all lg:rounded-md`}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Filter</h2>
                    {searchParams.toString().length > 0 && (
                        <Button
                            onClick={() => {
                                setRating("All");
                                setHourlyRate([0]);
                                setLocation("Set None");
                                setSelectedDays([]);
                                setSelectedSubjects([]);
                                router.push(`${pathname}`, {
                                    scroll: false,
                                });
                            }}
                            size="sm"
                            className="bg-red-500 hover:bg-red-700"
                        >
                            Clear Filters
                        </Button>
                    )}
                    <Button
                        className="lg:hidden bg-it-medium-dark hover:bg-it-destructive text-white rounded-full !p-3"
                        onClick={() => setIsFilterMenuOpen(false)}
                    >
                        <X />
                    </Button>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Subjects</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {subjects.map((subject) => (
                            <li
                                key={subject._id}
                                onClick={() => handleSubjectChange(subject._id)}
                                className={`px-2 py-1 cursor-pointer text-sm rounded list-none ${
                                    selectedSubjects.includes(subject._id)
                                        ? "bg-it-destructive text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {subject.name}
                            </li>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Rating</h2>
                    <div className="flex justify-between my-2">
                        <span>0</span>
                        <span>5</span>
                    </div>
                    <Slider
                        max={5}
                        step={0.1}
                        onValueChange={(value) => {
                            setRating(Number(value));
                            handleSearchQuery("rating", value[0]);
                        }}
                        className="w-full cursor-move"
                    />
                    <p className="text-sm mt-2">Selected Rating: {rating}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">
                        Hourly Rate (Taka)
                    </h2>
                    <div className="flex justify-between my-2">
                        <span>0</span>
                        <span>1000</span>
                    </div>
                    <Slider
                        max={1000}
                        step={1}
                        onValueChange={(value) => {
                            setHourlyRate(value);
                            handleSearchQuery("maxHRate", value[0]);
                        }}
                        value={hourlyRate}
                        className="w-full cursor-move"
                    />
                    <p className="text-sm mt-2">
                        Selected Hourly Rate: {hourlyRate[0]}
                    </p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Availability</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {days.map((day) => (
                            <li
                                key={day}
                                onClick={() => handleDaysChange(day)}
                                className={`px-2 py-1 text-sm list-none rounded  cursor-pointer ${
                                    selectedDays.includes(day)
                                        ? "bg-it-destructive text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {day}
                            </li>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Location</h2>
                    <span className="text-sm">
                        Insert (Area, City, District)
                    </span>
                    <Input
                        onChange={(e) => {
                            const value = e.target.value;
                            setLocation(value);
                            handleSearchQuery("location", value);
                        }}
                        value={location !== "Set None" ? location : ""}
                        className="w-full mt-2 border-white bg-it-medium-dark"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Sort By</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {sortByOptions.map((option) => (
                            <li
                                key={option.label}
                                onClick={() => handleSortByChange(option.value)}
                                className={`px-2 py-1 text-sm list-none rounded  cursor-pointer ${
                                    option.value === sortBy
                                        ? "bg-it-destructive text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
            <div className="fixed lg:hidden top-24 left-0 z-[1000]">
                <Button
                    className="flex items-center gap-x-2 bg-it-medium-dark hover:bg-it-destructive p-1 pr-2 text-white rounded-l-none rounded-r-[8px]"
                    onClick={() => setIsFilterMenuOpen(true)}
                >
                    <p className="text-lg font-semibold">Filter</p>
                    <Menu />
                </Button>
            </div>
        </section>
    );
}
