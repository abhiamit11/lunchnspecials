import { Search } from "lucide-react"
import { Button } from "./ui/button"

import { create } from 'zustand'
import useMap from "@/hooks/useMap";
import useCoordinates from "@/hooks/useCoordinates";

// Define the type for the state
type points = {
    longitude: number,
    latitude: number
}
interface SearchAreaState {
    show: boolean;
    toggleButton: (value: boolean) => void;
    points: points;
    setPoints: (point: points) => void
}

// Create the store using the typed state
export const useSearchAreaStore = create<SearchAreaState>((set) => ({
    points: {
        longitude: 0,
        latitude: 0
    },
    show: false,
    toggleButton: (value) => set(() => ({ show: value })),
    setPoints: (point: points) => set(() => ({ points: point })),
}));

function SearchThisArea() {
    const { show, points, toggleButton } = useSearchAreaStore((state: SearchAreaState) => state)

    const { setLocation } = useMap()
    const { setCoordinates } = useCoordinates()

    const SearchArea = () => {
        setLocation(points.longitude, points.latitude)
        setCoordinates(points.longitude, points.latitude)
        toggleButton(false)
    }
    return (
        <>
            {show && <div className="w-full col-span-2 text-center mt-2">
                <Button className="rounded-4xl" variant={"outline"} onClick={SearchArea}> <Search /> Search this area</Button>
            </div>}
        </>
    )
}

export default SearchThisArea