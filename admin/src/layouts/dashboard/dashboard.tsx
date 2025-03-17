import { AppSidebar } from "./app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "@tanstack/react-router"
import Header from "./header"

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <div className="flex flex-1 flex-col gap-4 p-3">
                    <div className="min-h-[100vh] flex-1 rounded-lg bg-sidebar md:min-h-min text-foreground p-5">
                        <Outlet />
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
