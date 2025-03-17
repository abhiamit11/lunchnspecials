import { KeyRound, LucideProps, } from "lucide-react"
import ChangePassword from "./change-password"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function Settings() {
    return (
        <>
            <div className="flex justify-between items-center p-4 rounded-lg">
                <h1 className="text-2xl font-medium">Settings</h1>
            </div>

            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    <SettingCard
                        icon={KeyRound}
                        title="Password"
                        description="You can change the password with this setting."
                    >
                        <div className="flex justify-end items-center">
                            <ChangePassword />
                        </div>
                    </SettingCard>

                    {/* <SettingCard
                        icon={Link}
                        title="Social Links"
                        description="You can set and update the social media links with this setting."
                    >
                        <div className="flex justify-end items-center">

                        </div>
                    </SettingCard> */}

                </div>
            </div>
        </>
    )
}

export default Settings

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
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}