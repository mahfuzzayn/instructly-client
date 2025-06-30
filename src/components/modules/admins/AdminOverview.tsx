/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { IAdmin, IBooking, IReview, ISubject, IUser } from "@/types";
import Link from "next/link";
import React from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Pie,
    PieChart,
    XAxis,
} from "recharts";

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

const areaChartConfig = {
    student: {
        label: "Student",
        color: "hsl(var(--it-700))",
    },
    tutor: {
        label: "Tutor",
        color: "hsl(var(--it-900))",
    },
} satisfies ChartConfig;

const AdminOverview = ({
    admin,
    users,
    bookings,
    subjects,
    reviews,
}: {
    admin: IAdmin;
    users: IUser[];
    bookings: IBooking[];
    subjects: ISubject[];
    reviews: IReview[];
}) => {
    // Users Area Chart
    const usersCountByMonth = new Array(12).fill({ student: 0, tutor: 0 });

    users.forEach((user: any) => {
        const role = user?.role;
        const date = new Date(user?.createdAt);
        const monthIndex = date.getUTCMonth();

        const monthData = { ...usersCountByMonth[monthIndex] };

        if (role === "student") {
            monthData.student += 1;
        } else if (role === "tutor") {
            monthData.tutor += 1;
        }

        usersCountByMonth[monthIndex] = monthData;
    });

    const usersAreaChartData = MONTHS.map((month, index) => ({
        month,
        student: usersCountByMonth[index].student,
        tutor: usersCountByMonth[index].tutor,
    }));

    // Bookings Bar Chart
    const bookingsCountByMonth = new Array(12).fill(0);

    bookings.forEach((booking: any) => {
        const date = new Date(booking.createdAt);
        const monthIndex = date.getUTCMonth();
        bookingsCountByMonth[monthIndex]++;
    });

    const bookingsBarChartData = MONTHS.map((month, index) => ({
        month,
        bookings: bookingsCountByMonth[index],
    }));

    // Reviews Pie Chart
    const reviewsCountByDay = new Array(7).fill(0);

    reviews.forEach((review: any) => {
        const date = new Date(review.createdAt);
        const dayIndex = date.getUTCDay();
        reviewsCountByDay[dayIndex]++;
    });

    const reviewsPieChartData = reviewsCountByDay.map((day, index) => ({
        day: WEEKS[index],
        reviews: reviewsCountByDay[index],
        fill: `var(--color-${WEEKS[index].toLowerCase()})`,
    }));

    return (
        <>
            <div className="flex flex-col md:flex-row gap-6">
                <div
                    className="w-full md:w-[70%] rounded-md p-5 space-y-2 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/admin/dashboard/users`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Users
                        </Link>
                    </h2>
                    <p className="text-4xl font-extrabold !mb-5">
                        {users?.length || 0}
                    </p>
                    <div className="bg-black/20 p-4 rounded-md">
                        <ChartContainer
                            config={areaChartConfig}
                            className="max-h-[230px] w-full"
                        >
                            <AreaChart
                                accessibilityLayer
                                data={usersAreaChartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent indicator="dot" />
                                    }
                                />
                                <Area
                                    dataKey="student"
                                    type="natural"
                                    fill="var(--color-student)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-student)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="tutor"
                                    type="natural"
                                    fill="var(--color-tutor)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-tutor)"
                                    stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </div>
                    <p className="text-sm !mt-4">
                        <span className="font-semibold">Note:</span> This chart
                        shows students & tutors whom joined Instructly in
                        months.
                    </p>
                </div>
                <div
                    className="w-full md:w-[30%] rounded-md p-5 space-y-4 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">Bio</h2>
                    <p className="text-xl font-extrabold">
                        {admin?.bio ? (
                            <i>{admin?.bio}</i>
                        ) : (
                            <i className="text-gray-500">
                                You didn't set your bio, go to manage profile
                                and insert information.
                            </i>
                        )}
                    </p>
                </div>
            </div>
            <div
                className="w-full rounded-md p-5 space-y-4 border-[1px] border-[#fffff350]"
                style={{
                    backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                }}
            >
                <h2 className="text-2xl font-normal">
                    <Link
                        href={`/admin/dashboard/subjects`}
                        className="hover:underline hover:text-it-destructive"
                    >
                        Subjects
                    </Link>
                </h2>
                {subjects.length > 0 ? (
                    <ul className="flex flex-wrap gap-4">
                        {subjects.map((subject, idx) => (
                            <li
                                key={idx}
                                className="bg-it-secondary px-2 py-0.5 text-white rounded-md text-md font-semibold"
                            >
                                {subject?.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-2">
                        <i className="font-semibold">No subjects were found.</i>
                    </p>
                )}
            </div>
            <div className="flex flex-col md:flex-row gap-5 ">
                <div
                    className="w-full rounded-md p-5 space-y-2 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/admin/dashboard/bookings`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Bookings
                        </Link>
                    </h2>
                    <p className="text-4xl font-extrabold !mb-5">
                        {bookings?.length || 0}
                    </p>
                    <div className="bg-black/20 p-4 rounded-md">
                        <ChartContainer
                            config={barChartConfig}
                            className="max-h-[230px] w-full"
                        >
                            <BarChart
                                accessibilityLayer
                                data={bookingsBarChartData}
                            >
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
                    <p className="text-sm !mt-4">
                        <span className="font-semibold">Note:</span> This chart
                        shows student bookings in months.
                    </p>
                </div>
                <div
                    className="w-full rounded-md p-5 space-y-2 border-[1px] border-[#fffff350]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvd0x20di/image/upload/v1751180451/blue-gradient-bg_jcmikh.jpg')`,
                    }}
                >
                    <h2 className="text-2xl font-normal">
                        <Link
                            href={`/admin/dashboard/reviews`}
                            className="hover:underline hover:text-it-destructive"
                        >
                            Reviews
                        </Link>
                    </h2>
                    <p className="text-4xl font-extrabold !mb-5">
                        {reviews?.length || 0}
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
                                    data={reviewsPieChartData}
                                    dataKey="reviews"
                                    label
                                    nameKey="day"
                                />
                            </PieChart>
                        </ChartContainer>
                    </div>
                    <p className="text-sm !mt-4">
                        <span className="font-semibold">Note:</span> This chart
                        shows tutors review recevied in week from students.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AdminOverview;
