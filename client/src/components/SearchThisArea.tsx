import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { create } from "zustand"
import useMap from "@/hooks/useMap"
import useCoordinates from "@/hooks/useCoordinates"

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

export const useSearchAreaStore = create<SearchAreaState>((set) => ({
    points: { longitude: 0, latitude: 0 },
    show: false,
    toggleButton: (value: boolean) => set({ show: value }),
    setPoints: (point: { longitude: number; latitude: number }) => set({ points: point }),
}))

function SearchThisArea() {
    const { show, points, toggleButton } = useSearchAreaStore((state) => state)
    const { setLocation } = useMap()
    const { setCoordinates } = useCoordinates()

    const handleSearchArea = () => {
        setLocation(points.longitude, points.latitude)
        setCoordinates(points.longitude, points.latitude)
        toggleButton(false)
    }

    document.documentElement.style.setProperty('--popup-margin-top', '135px');
    if (!show) {
        document.documentElement.style.setProperty('--popup-margin-top', '80px');
        return null
    }

    return (
        <div className="w-full col-span-2 text-center my-2">
            <Button
                aria-label="search-this-area"
                className="rounded-4xl"
                variant="outline"
                onClick={handleSearchArea}
            >
                <Search /> Search this area
            </Button>
        </div>
    )
}

export default SearchThisArea