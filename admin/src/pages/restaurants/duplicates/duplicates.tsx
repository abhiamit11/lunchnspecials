import { Button } from "@/components/ui/button"
import { useNavigate } from "@tanstack/react-router"
import { ChevronLeft, Trash2 } from "lucide-react"
import { DataTable } from "./table/data-table"
import { columns } from "./table/columns"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getDuplicateRestaurants } from "./api";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/hooks/use-toast"
import { deleteDuplicateRestaurant } from "./api"

function Duplicates() {
    const navigate = useNavigate()
    const goBack = () => {
        navigate({ to: '/restaurants' })
    }

    const { data, isSuccess } = useQuery({
        queryKey: ["duplicate-restaurants"], //Array according to Documentation
        queryFn: getDuplicateRestaurants,
        placeholderData: keepPreviousData,
    });

    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: deleteDuplicateRestaurant,
        onSuccess: () => {
            setOpen(false)
            queryClient.invalidateQueries({ queryKey: ['duplicate-restaurants'] })
            toast({
                variant: "default",
                title: "The Duplicate restaurants has been deleted.",
                description: "Your request has been successfully completed.",
            })
        },
    })

    const onDelete = () => {
        mutate()
    }

    return (
        <>
            <div className="flex justify-between items-center py-4 rounded-lg">
                <div className="flex justify-start items-center gap-2">
                    <Button variant={'ghost'} size={'icon'} onClick={goBack}><ChevronLeft /></Button>
                    <h1 className="text-2xl font-medium">Duplicate Restaurants</h1>
                </div>
                <div className="flex justify-end items-center gap-2">
                    {(isSuccess && data.total > 0) && <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant={'destructive'}
                                type="button">
                                <Trash2 />
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-foreground">Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <span className="block my-2 text-gray-900 font-medium">
                                        It will remove all duplicate restaurants displayed in the table, keeping only the most recently updated restaurant.
                                    </span>
                                    <span className="text-destructive font-medium">
                                        You are about to delete all Duplicate restaurants.
                                        This action cannot be undone and will permanently remove all associated data. Are you sure you want to proceed?
                                    </span>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="text-foreground">Cancel</AlertDialogCancel>
                                <Button variant={"destructive"} onClick={onDelete} disabled={isPending}>
                                    Continue
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>}
                </div>
            </div>

            <div className="bg-background p-5 rounded-lg">
                <div className="container mx-auto">
                    <h2 className="my-2"> Total: <strong> {isSuccess ? data.total : 0} </strong> duplicate restaurant records in the system.</h2>
                    {isSuccess && <DataTable data={data.data} columns={columns} />}
                </div>
            </div>
        </>
    )
}

export default Duplicates