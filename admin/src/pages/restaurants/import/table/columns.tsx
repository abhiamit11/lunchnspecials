"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ImportHistoryType } from "../../types"
import { format } from "date-fns/format"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<ImportHistoryType>[] = [
    {
        accessorKey: "importedAt",
        header: "Date",
        cell: ({ row }) => {
            const { importedAt } = row.original
            return <span>{format(importedAt, 'dd-MM-yyyy')}</span>
        }
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => {
            const { importedAt } = row.original
            return <span>{format(importedAt, 'hh:mm a')}</span>
        }
    },
    {
        accessorKey: "importedCount",
        header: "Imported Record",
    },
    {
        accessorKey: "succeed",
        header: "Status",
        cell: ({ row }) => {
            const { succeed } = row.original
            if (succeed) return <Badge variant="success">Succeed</Badge>
            return <Badge variant="destructive">Fail</Badge>
        }
    },
]
