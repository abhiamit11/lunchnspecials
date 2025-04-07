import { LucideProps } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type SettingCardProps = {
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    title?: string
    description?: string
    children: React.ReactNode
}
const SettingCard = ({ title, description, icon: Icon, children }: SettingCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <div className="flex justify-start items-center gap-2">
                        <Icon />
                        {title!}
                    </div>
                </CardTitle>
                <CardDescription className="truncate">{description!}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                {children}
            </CardContent>
        </Card>
    )
}

export default SettingCard