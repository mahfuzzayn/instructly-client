import ManageTutorBookings from "@/components/modules/bookings/tutor/ManageTutorBookings";
import { getMyBookings } from "@/services/Booking";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Bookings ‣ Tutor Dashboard ‣ Instructly",
    description:
        "Review and update your upcoming and past bookings to stay on top of your schedule.",
};

const TutorBookingsPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page: string }>;
}) => {
    const { page } = await searchParams;
    const { data: bookings, meta } = await getMyBookings("5", page);

    return (
        <ManageTutorBookings
            bookings={bookings}
            meta={meta}
        ></ManageTutorBookings>
    );
};

export default TutorBookingsPage;
