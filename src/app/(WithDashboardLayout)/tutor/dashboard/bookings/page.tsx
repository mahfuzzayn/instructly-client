import ManageTutorBookings from "@/components/modules/bookings/tutor/ManageTutorBookings";
import { getMyBookings } from "@/services/Booking";
import React from "react";

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
