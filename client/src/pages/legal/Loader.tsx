import { Loader2 } from "lucide-react"

function Loader() {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div role="status">
                <Loader2 className="w-16 h-16 text-gray-200 animate-spin" />
                <span className="sr-only">Loading...</span>
            </div>
            <h1 className="text-gray-800 font-semibold text-xl">We are fetching content for you.<br /> Please wait.</h1>
        </div>
    )
}

export default Loader