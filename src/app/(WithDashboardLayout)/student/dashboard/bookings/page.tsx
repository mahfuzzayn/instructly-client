import ManageStudentBookings from "@/components/modules/bookings/student/ManageStudentBookings";
import { getMyBookings } from "@/services/Booking";
import React from "react";

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
