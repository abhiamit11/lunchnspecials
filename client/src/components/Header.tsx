import MyLocation from "./MyLocation";
import LocationSearch from "./LocationSearch";
import DaySelect from "./DaySelect";
import { LOGO_URL } from "@/constant";
import SearchThisArea from "./SearchThisArea";

function Header() {
    return (
        <div className="fixed top-0 z-20 w-full px-1 sm:px-4 py-1 bg-white">
            <div className="container mx-auto flex justify-center items-start">
                <div className="h-20 w-20 max-sm:hidden mr-2">
                    <img src={LOGO_URL || "/logo.png"} alt="" className="" />
                </div>

                <div className="container mx-auto grid grid-cols-2 md:flex justify-center items-start gap-1 md:gap-3 py-1 sm:py-4 px-1.5">
                    <LocationSearch />
                    <div className="col-span-2 flex justify-between items-center">
                        <div className="sm:hidden w-1/3">
                            <img src={LOGO_URL || "/logo.png"} alt="" className="h-12 w-12" />
                        </div>
                        <div className="flex justify-start items-center w-2/3 sm:gap-x-2 sm:w-full">
                            <MyLocation />
                            <DaySelect />
                        </div>
                    </div>
                </div>
            </div>
            <SearchThisArea />
        </div>
    )
}

export default Header