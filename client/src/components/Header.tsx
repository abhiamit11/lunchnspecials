import MyLocation from "./MyLocation";
import LocationSearch from "./LocationSearch";
import DaySelect from "./DaySelect";

function Header() {
    return (
        <div className="fixed top-0 z-10 w-full px-4 py-1">
            <div className="container mx-auto flex justify-center items-start">
                <div className="h-20 w-20 max-sm:hidden">
                    <img src="/logo.png" alt="" className="" />
                </div>

                <div className="container mx-auto grid grid-cols-2 md:flex justify-center items-start gap-1 md:gap-3 py-2 sm:py-4">
                    <LocationSearch />
                    <MyLocation />
                    <DaySelect />
                </div>
            </div>
        </div>
    )
}

export default Header