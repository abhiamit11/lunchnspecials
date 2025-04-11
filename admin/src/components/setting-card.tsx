import { LucideProps } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type SettingCardProps = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    title?: string
    description?: string
    children: React.ReactNode
    className?: string
}
const SettingCard = ({ title, description, icon: Icon, children, className }: SettingCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className={cn("flex justify-start items-center gap-2", className)}>
                        <Icon />
                        {title!}
                    </div>
                </CardTitle>
                <CardDescription className={cn("truncate")}>{description!}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                {children}
            </CardContent>
        </Card>
    )
}

export default SettingCard