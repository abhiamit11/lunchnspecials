import { ColumnDef } from "@tanstack/react-table"
import { DuplicateRestaurantsType } from "../api"

export const columns: ColumnDef<DuplicateRestaurantsType>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "count",
        header: "Duplicate Count",
    }
]
