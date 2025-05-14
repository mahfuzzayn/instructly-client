import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { getMe } from "@/services/AuthService";
import logo from "../../assets/images/logo.png";
import Image from "next/image";

export default async function TutorDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data } = await getMe();

    const user = {
        ...data.user,
        profileUrl: data?.profileUrl,
    };

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="block">
                                    <BreadcrumbLink className="text-black flex items-center gap-x-2">
                                        <Image
                                            src={logo}
                                            height={24}
                                            width={24}
                                            alt="Instructly Logo"
                                        />
                                        <span className="font-medium hidden md:block">
                                            Instructly{" "}
                                            {user?.role === "tutor"
                                                ? "Tutor Dashboard Management"
                                                : user?.role === "student"
                                                ? "Student Dashboard Management"
                                                : "Dashboard Management"}
                                        </span>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <section className="p-4 pt-0">{children}</section>
            </SidebarInset>
        </SidebarProvider>
    );
}
