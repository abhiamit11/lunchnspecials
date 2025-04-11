import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { exportRestaurants } from "./api"
import { CSVLink } from "react-csv"

function DownloadEverything() {
    const [open, setOpen] = useState(false)

    const { mutate, isSuccess, data, isPending } = useMutation({
        mutationFn: exportRestaurants,
        mutationKey: ['export-all-restaurants'],
        onSuccess: () => {

        },
    })
    useEffect(() => {
        if (open) {
            mutate()
        }
        return () => {

        }
    }, [open])
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"link"} className="p-0 h-auto">Download</Button>
            </DialogTrigger>
            <DialogContent className="text-foreground">
                <DialogHeader>
                    <DialogTitle className="">Download All Restaurants</DialogTitle>
                    <DialogDescription className="my-5">

                    </DialogDescription>
                </DialogHeader>
                <div className="my-2.5">
                    {isPending && <>Fetching data...</>}
                    {isSuccess && <>
                        The system contains a total of <strong className="underline">{data.total} restaurants</strong>. Click the download button to export all restaurants as a CSV file.
                    </>}
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="default" asChild disabled={isPending}>
                        {isSuccess && <CSVLink data={data.data} filename={`all_restaurants_${new Date().toDateString().replace(/ /g, "_")}`}>Download</CSVLink>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default DownloadEverything