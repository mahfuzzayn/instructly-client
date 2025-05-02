"use client";

import * as React from "react";
import { BookOpen, SquareActivity, StarIcon } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import { IUser } from "@/types/user";

export function AppSidebar({
    user,
    ...props
}: {
    user: IUser;
    props?: React.ComponentProps<typeof Sidebar>;
}) {
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
                url: "#",
                icon: BookOpen,
                items: [
                    {
                        title: "Create a Subject",
                        url: `/${user?.role}/dashboard/subjects/create-subject`,
                    },
                    {
                        title: "My Subjects",
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
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain items={data.tutorNav} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
