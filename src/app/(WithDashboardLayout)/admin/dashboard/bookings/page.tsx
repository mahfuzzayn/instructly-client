import ManageAdminBookings from "@/components/modules/bookings/admin/ManageAdminBookings";
import { getMyBookings } from "@/services/Booking";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Bookings ‣ Admin Dashboard ‣ Instructly",
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
        <ManageAdminBookings
            bookings={bookings}
            meta={meta}
        ></ManageAdminBookings>
    );
};

export default TutorBookingsPage;
