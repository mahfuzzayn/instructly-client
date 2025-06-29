"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import logo from "@/assets/images/logo_2.png";
import Image from "next/image";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import clsx from "clsx";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url?: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
        collapsible: boolean;
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="my-2">
                <div className="flex justify-start items-center gap-x-2 p-2">
                    <Image
                        src={logo}
                        height={40}
                        width={40}
                        alt="Instructly Logo"
                    />
                    <h2 className="text-2xl text-white font-extrabold">
                        Instructly
                    </h2>
                </div>
            </SidebarGroupLabel>
            <SidebarGroupLabel className="text-white text-sm font-semibold">
                Services
            </SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            {item.url ? (
                                <Link href={item.url}>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            className={clsx(
                                                "hover:!bg-it-light-dark"
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon color="white" />
                                            )}
                                            {item.url ? (
                                                <>
                                                    <span className="text-white">
                                                        {item.title}
                                                    </span>
                                                </>
                                            ) : (
                                                <span>{item.title}</span>
                                            )}
                                            {item.collapsible && (
                                                <ChevronRight className="text-white ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            )}
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                </Link>
                            ) : (
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        className="hover:bg-it-light-dark"
                                    >
                                        {item.icon && <item.icon />}
                                        <span className="text-white">
                                            {item.title}
                                        </span>
                                        {item.collapsible && (
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        )}
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                            )}
                            {item.collapsible && (
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton
                                                    asChild
                                                    className="hover:bg-it-light-dark"
                                                >
                                                    <Link href={subItem.url}>
                                                        <span className="text-white">
                                                            {subItem.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            )}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
