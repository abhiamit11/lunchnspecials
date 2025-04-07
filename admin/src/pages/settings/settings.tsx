import { KeyRound } from "lucide-react"
import ChangePassword from "./change-password"
import SettingCard from "@/components/setting-card"

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
