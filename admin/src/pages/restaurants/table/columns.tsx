import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./column-header"
import RowActions from "./row-actions";
import { Restaurant } from "../types";
import { format } from "date-fns/format"
import { ColumnsCellCheckbox, ColumnsHeaderCheckbox } from "./column-checkbox";
import ViewMenu from "./view-menu";

export const columns: ColumnDef<Restaurant>[] = [
    {
        id: "select",
        header: ColumnsHeaderCheckbox,
        cell: ColumnsCellCheckbox
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
    },
    {
        accessorKey: "zip",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Zip" />
        ),
    },
    {
        accessorKey: "menu",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Menu" />
        ),
        cell: ({ row }) => {
            const { _id } = row.original
            return <ViewMenu id={_id} />
        }
    },
    {
        accessorKey: "creationAt",
        header: "Added Date",
        cell: ({ row }) => {
            const { creationAt } = row.original
            return <span>{format(creationAt, 'dd-MM-yyyy')}</span>
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Update Date",
        cell: ({ row }) => {
            const { updatedAt } = row.original
            return <span>{format(updatedAt, 'dd-MM-yyyy')}</span>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const { _id } = row.original
            return <RowActions id={_id} />
        }
    }
]
