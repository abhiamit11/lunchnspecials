import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from '@/components/theme/theme-toggle'

function Header() {
    return (
        <header className="flex h-16 shrink-0 justify-between items-center gap-2 border-b px-4 bg-sidebar">
            <div className="flex h-16 shrink-0 items-center gap-2">
                <SidebarTrigger className="-ml-1 text-foreground" />
                <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

            <div>
                <ThemeToggle />
            </div>
        </header>
    )
}

export default Header