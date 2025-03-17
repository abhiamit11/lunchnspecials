import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link, useRouterState } from "@tanstack/react-router"
import { LayoutDashboard, LogOut, Settings, Utensils } from "lucide-react";
import useAuth from "@/hooks/use-auth";

// This is sample data.
const items = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard
    },
    {
        title: "Restaurants",
        url: "/restaurants",
        icon: Utensils
    },
    {
        title: "settings",
        url: "/settings",
        icon: Settings
    }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {
        state
    } = useSidebar()
    const { location: { pathname } } = useRouterState();
    const { logout } = useAuth()
    const onLogout = () => {
        logout()
    }
    return (
        <Sidebar {...props} collapsible="icon" >
            <SidebarHeader className="h-16 flex justify-center items-center overflow-hidden">
                {state == "expanded" && <h1 className="text-2xl capitalize font-medium">LunchNSpecials</h1>}
            </SidebarHeader>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupLabel></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname == item.url}>
                                        <Link to={item.url} className="capitalize">
                                            <item.icon />
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter className="mb-16">

                <SidebarMenuButton onClick={onLogout}>
                    <>
                        <LogOut />
                        Logout
                    </>
                </SidebarMenuButton>

            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
