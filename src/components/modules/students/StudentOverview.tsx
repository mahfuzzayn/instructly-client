/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { IStudent } from "@/types";
import Link from "next/link";
import React from "react";
import { Bar, BarChart, CartesianGrid, Pie, PieChart, XAxis } from "recharts";

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const WEEKS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const barChartConfig = {
    desktop: {
        label: "Reviews",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

const pieChartConfig = {
    reviews: {
        label: "Reviews",
    },
    saturday: {
        label: "Saturday",
        color: "hsl(var(--chart-1))",
    },
    sunday: {
        label: "Sunday",
        color: "hsl(var(--chart-2))",
    },
    monday: {
        label: "Monday",
        color: "hsl(var(--chart-3))",
    },
    tuesday: {
        label: "Tuesday",
        color: "hsl(var(--chart-4))",
    },
    wednesday: {
        label: "Wednesday",
        color: "hsl(var(--chart-5))",
    },
    thursday: {
        label: "Thursday",
        color: "hsl(var(--chart-6))",
    },
    friday: {
        label: "Friday",
        color: "hsl(var(--chart-7))",
    },
} satisfies ChartConfig;

const StudentOverview = ({ student }: { student: IStudent }) => {
    const bookingsCountByMonth = new Array(12).fill(0);

    student.bookingHistory.forEach((booking: any) => {
        const date = new Date(booking.createdAt);
        const monthIndex = date.getUTCMonth();
        bookingsCountByMonth[monthIndex]++;
    });

    const barChartData = MONTHS.map((month, index) => ({
        month,
        bookings: bookingsCountByMonth[index],
    }));

    const reviewsCountByDay = new Array(7).fill(0);

    student.reviewsGiven.forEach((review: any) => {
        const date = new Date(review.createdAt);
        const dayIndex = date.getUTCDay();
        reviewsCountByDay[dayIndex]++;
    });

    const pieChartData = reviewsCountByDay.map((day, index) => ({
        day: WEEKS[index],
        reviews: reviewsCountByDay[index],
        fill: `var(--color-${WEEKS[index].toLowerCase()})`,
    }));

    return (
        <>
            <div
                className="w-full rounded-md p-5 space-y-2 border-[1px] border-[#fffff350]"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <h2 className="text-2xl font-normal">
                    <Link
                        href={`/student/dashboard/bookings`}
                        className="hover:underline hover:text-it-destructive"
                    >
                        Bookings
                    </Link>
                </h2>
                <p className="text-4xl font-extrabold !mb-5">
                    {student?.bookingHistory?.length || 0}
                </p>
                <div className="bg-black/20 p-4 rounded-md">
                    <ChartContainer
                        config={barChartConfig}
                        className="max-h-[230px] w-full"
                    >
                        <BarChart accessibilityLayer data={barChartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="bookings"
                                fill="hsl(var(--it-700))"
                                radius={8}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </div>
            <div
                className="w-full rounded-md p-5 space-y-2 border-[1px] border-[#fffff350]"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <h2 className="text-2xl font-normal">
                    <Link
                        href={`/student/dashboard/reviews`}
                        className="hover:underline hover:text-it-destructive"
                    >
                        Reviews
                    </Link>
                </h2>
                <p className="text-4xl font-extrabold !mb-5">
                    {student?.reviewsGiven?.length || 0}
                </p>
                <div className="bg-black/20 p-4 rounded-md">
                    <ChartContainer
                        config={pieChartConfig}
                        className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[230px] pb-0"
                    >
                        <PieChart>
                            <ChartTooltip
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={pieChartData}
                                dataKey="reviews"
                                label
                                nameKey="day"
                            />
                        </PieChart>
                    </ChartContainer>
                </div>
            </div>
        </>
    );
};

export default StudentOverview;
