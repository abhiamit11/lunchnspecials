import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DataTableProps } from "./types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteManyRestaurant } from "../api"
import { toast } from "@/hooks/use-toast"
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
import { Input } from "@/components/ui/input"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { PaginationType } from "../types"
import ExportButton from "./export-button"
import Filters from "./filters"


export function DataTableViewOptions<TData>({
    table,
}: DataTableProps<TData>) {

    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: deleteManyRestaurant,
        onSuccess: () => {
            table.resetRowSelection()
            setalertDialogState(false)
            queryClient.invalidateQueries({ queryKey: ['restaurants'] })
            toast({
                variant: "default",
                title: "The Selected restaurant has been deleted.",
                description: "Your request has been successfully completed.",
            })
        },
    })

    const rows = table.getState().rowSelection //table.getFilteredSelectedRowModel().rows
    const rowsArr = Object.keys(rows);
    const hasRowsSelected = rowsArr.length > 0
    const onSelectedRowDelete = () => {
        const ids: string[] = []
        rowsArr.forEach(row => {
            // const { _id } = row.original as { _id: string }
            ids.push(row)
        });
        mutate({ ids })
    }

    const [alertDialogState, setalertDialogState] = useState(false)

    const navigate = useNavigate({ from: "" })
    const { search }: PaginationType = useSearch({ from: '' })
    const [searchStr, setSearchstr] = useState(search)
    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const str = event.target.value;
        setSearchstr(str)
        navigate({
            search: (prev: PaginationType) => ({
                ...prev,
                search: str
            })
        })

    }



    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center py-4 w-full">
                <Input
                    placeholder="Search Name, Address or zip..."
                    value={searchStr}
                    onChange={onSearch}
                    className="max-w-sm active:ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            <div className="flex justify-end items-center gap-3">
                {hasRowsSelected &&
                    <>
                        <Button
                            variant={'outline'}
                            type="button"
                            size={"sm"}
                            className="h-8"
                            onClick={() => table.resetRowSelection()}>Uncheck</Button>

                        <ExportButton rows={rowsArr} table={table} />
                        <AlertDialog open={alertDialogState} onOpenChange={setalertDialogState}>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant={'destructive'}
                                    type="button"
                                    size={"sm"}
                                    className="h-8">
                                    Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-foreground'>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        You are about to delete
                                        <span className="font-bold"> {rows.length} </span>
                                        restaurants. This action cannot be undone and will permanently remove all associated data. Are you sure you want to proceed?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="text-foreground">Cancel</AlertDialogCancel>
                                    {/* <AlertDialogAction asChild> */}
                                    <Button variant={"destructive"} onClick={onSelectedRowDelete} disabled={isPending}>
                                        Continue
                                    </Button>
                                    {/* </AlertDialogAction> */}
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                }
                <div className=" flex justify-end items-center gap-2">
                    <Filters />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="hidden h-8 lg:flex"
                            >
                                <Eye />
                                View
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[150px]">
                            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) =>
                                        typeof column.accessorFn !== "undefined" && column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
