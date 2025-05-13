"use client";

import * as React from "react";
import { BookOpen, SquareActivity, StarIcon, Undo2 } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import { IUser } from "@/types/user";
import { useUser } from "@/context/UserContext";

export function AppSidebar({
    user,
    ...props
}: {
    user: IUser;
    props?: React.ComponentProps<typeof Sidebar>;
}) {
    const { setUser, setIsLoading } = useUser();

    const data = {
        user,
        tutorNav: [
            {
                title: "Overview",
                url: `/${user?.role}/dashboard`,
                icon: SquareActivity,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Bookings",
                url: `/${user?.role}/dashboard/bookings`,
                icon: SquareActivity,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Subjects",
                url: `/${user?.role}/dashboard/subjects`,
                icon: BookOpen,
                items: [
                    {
                        title: "Create Subject",
                        url: `/${user?.role}/dashboard/subjects/create-subject`,
                    },
                    {
                        title: "Manage Subjects",
                        url: `/${user?.role}/dashboard/subjects`,
                    },
                ],
                collapsible: true,
            },
            {
                title: "Reviews",
                url: `/${user?.role}/dashboard/reviews`,
                icon: StarIcon,
                collapsible: false,
            },
            {
                title: "Back to Home",
                url: `/`,
                icon: Undo2,
                collapsible: false,
            },
        ],
        studentNav: [
            {
                title: "Overview",
                url: `/${user?.role}/dashboard`,
                icon: SquareActivity,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Bookings",
                url: `/${user?.role}/dashboard/bookings`,
                icon: SquareActivity,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Reviews",
                icon: StarIcon,
                url: `/${user?.role}/dashboard/reviews`,
                items: [
                    {
                        title: "Give Review",
                        url: `/${user?.role}/dashboard/reviews/give-review`,
                    },
                    {
                        title: "My Reviews",
                        url: `/${user?.role}/dashboard/reviews`,
                    },
                ],
                collapsible: true,
            },
            {
                title: "Back to Home",
                url: `/`,
                icon: Undo2,
                collapsible: false,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain
                    items={
                        user?.role === "tutor" ? data.tutorNav : data.studentNav
                    }
                />
            </SidebarContent>
            <SidebarFooter>
                <NavUser
                    user={data.user}
                    setUser={setUser}
                    setIsLoading={setIsLoading}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
