import { ImageUp, KeyRound, Link } from "lucide-react"
import ChangePassword from "./change-password"
import SettingCard from "@/components/setting-card"
import UpdateLinks from "./update-links"
import UpdateLogo from "./logo/site-logo"

function Settings() {
    return (
        <>
            <div className="flex justify-between items-center p-4 rounded-lg">
                <h1 className="text-2xl font-medium">Settings</h1>
            </div>

            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    <SettingCard
                        icon={Link}
                        title="Social Links"
                        description="You can set and update the social media links with this setting."
                    >
                        <div className="flex justify-end items-center">
                            <UpdateLinks />
                        </div>
                    </SettingCard>

                    <SettingCard
                        icon={ImageUp}
                        title="Logo"
                        description="You can set and update the Logo of site with this setting."
                    >
                        <div className="flex justify-end items-center">
                            <UpdateLogo />
                        </div>
                    </SettingCard>

                    <SettingCard
                        icon={KeyRound}
                        title="Password"
                        description="You can change the password with this setting."
                    >
                        <div className="flex justify-end items-center">
                            <ChangePassword />
                        </div>
                    </SettingCard>
                </div>
            </div>
        </>
    )
}

export default Settings
