import ManageStudentBookings from "@/components/modules/bookings/student/ManageStudentBookings";
import { getMyBookings } from "@/services/Booking";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Bookings ‣ Student Dashboard ‣ Instructly",
    description:
        "Review and update your upcoming and past bookings to stay on top of your schedule.",
};

const StudentBookingsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data: bookings, meta } = await getMyBookings("5", page);

    return (
        <ManageStudentBookings
            bookings={bookings}
            meta={meta}
        ></ManageStudentBookings>
    );
};

export default StudentBookingsPage;
