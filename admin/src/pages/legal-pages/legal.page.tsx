import SettingCard from "@/components/setting-card"
import { Link } from "@tanstack/react-router"
import { Cookie, FileCheck2, FileUser, ShieldCheck } from "lucide-react"

function LegalPages() {
    return (
        <>
            <div className="flex justify-between items-center p-4 rounded-lg">
                <h1 className="text-2xl font-medium">Legal Pages</h1>
            </div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <SettingCard
                        icon={FileUser}
                        title="About us"
                        description="Update the 'About Us' using this setting."
                    >
                        <div className="flex justify-end items-center">
                            <Link to="/legal-pages/about-us" className="m-0 p-0 hover:underline text-base font-medium">Edit</Link>
                        </div>
                    </SettingCard>

                    <SettingCard
                        icon={ShieldCheck}
                        title="Privacy Policy"
                        description="Update the 'Privacy Policy' using this setting."
                    >
                        <div className="flex justify-end items-center">
                            <Link to="/legal-pages/privacy-policy" className="m-0 p-0 hover:underline text-base font-medium">Edit</Link>
                        </div>
                    </SettingCard>

                    <SettingCard
                        icon={FileCheck2}
                        title="Terms and Conditions"
                        description="Update the 'Terms and Conditions' using this setting."
                    >
                        <div className="flex justify-end items-center">
                            <Link to="/legal-pages/terms-conditions" className="m-0 p-0 hover:underline text-base font-medium">Edit</Link>
                        </div>
                    </SettingCard>

                    <SettingCard
                        icon={Cookie}
                        title="Cookies Policy"
                        description="Update the 'Cookies Policy' using this setting."
                    >
                        <div className="flex justify-end items-center">
                            <Link to="/legal-pages/cookies-policy" className="m-0 p-0 hover:underline text-base font-medium">Edit</Link>
                        </div>
                    </SettingCard>

                </div>
            </div>
        </>
    )
}

export default LegalPages