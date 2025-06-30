import AdminOverview from "@/components/modules/admins/AdminOverview";
import { getAllSubjectsByAdmin, getAllUsers } from "@/services/Admin";
import { getMe } from "@/services/AuthService";
import { getAllBookings } from "@/services/Booking";
import { getAllReviews } from "@/services/Review";
import { IAdmin, IBooking, IReview, ISubject, IUser } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Admin Dashboard ‣ Instructly",
    description:
        "Access instructly's inside to see overview, manage bookings, subjects, and your profile as an admin.",
};

const AdminDashboardPage = async () => {
    const { data: admin }: { data: IAdmin } = await getMe();
    const { data: users }: { data: IUser[] } = await getAllUsers();
    const { data: subjects }: { data: ISubject[] } =
        await getAllSubjectsByAdmin();
    const { data: bookings }: { data: IBooking[] } = await getAllBookings();
    const { data: reviews }: { data: IReview[] } = await getAllReviews();

    return (
        <main className="space-y-5 m-5">
            <section className="space-y-6 w-full">
                <AdminOverview
                    admin={admin}
                    users={users}
                    bookings={bookings}
                    subjects={subjects}
                    reviews={reviews}
                />
            </section>
        </main>
    );
};

export default AdminDashboardPage;
