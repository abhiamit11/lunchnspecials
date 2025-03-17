import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CircleHelp } from "lucide-react"
import FileUpload from "./file-upload"
import ImportHistroy from "./table"

function Import() {

    return (
        <>
            <div className="flex justify-between items-center p-4 rounded-lg">
                <h1 className="text-2xl font-medium">Import Restaurants</h1>
                <div className="flex justify-end items-center gap-2">
                    <TooltipProvider delayDuration={200}>
                        <Tooltip data-side="bottom">
                            <TooltipTrigger asChild>
                                <Button variant={"link"} asChild>
                                    <a href="/sample.csv" download>
                                        Download Sample CSV
                                    </a>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm" side="bottom">
                                <p>Download a sample CSV file to help you understand the required format for data import. This sample provides a template with pre-filled data fields, ensuring a smooth upload process.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div className="bg-background p-5 rounded-lg">
                <div className="container mx-auto">
                    <div className="flex justify-start items-center gap-2 my-2 text-sm mb-4">
                        <CircleHelp className="h-5 w-5" />
                        <p className="max-w-4xl">The Import function allows you to seamlessly upload and integrate restaurant data into the system from external CSV files. Please ensure that the CSV file is correctly formatted. If you don't have a properly formatted CSV file, <a href="/sample.csv" className="hover:underline" download>click here to get one.</a></p>
                    </div>
                    <FileUpload />
                </div>
            </div>

            <ImportHistroy />

        </>
    )
}

export default Import