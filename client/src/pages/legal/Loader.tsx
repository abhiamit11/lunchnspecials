import { LoaderCircle } from 'lucide-react'

function Loader() {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div role="status">
                <LoaderCircle className="w-20 h-20 text-gray-800 animate-spin duration-1000" />
                <span className="sr-only">Loading...</span>
            </div>
            <h1 className="text-gray-800 font-semibold text-2xl">We are fetching content for you.<br /> Please wait.</h1>
        </div>
    )
}

export default Loader