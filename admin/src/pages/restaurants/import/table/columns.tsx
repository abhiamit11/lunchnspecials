"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ImportHistoryType } from "../../types"
import { format } from "date-fns/format"
import { Badge } from "@/components/ui/badge"
import { Check, Info } from "lucide-react"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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
            const { succeed, partial } = row.original
            if (partial) {
                return (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Badge variant="warning"><Info className="mr-1 h-3 w-3" /> Partial</Badge>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                                <p>Partial indicates that the import was only successful for some restaurants and may have completed with some errors.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            }
            if (succeed) return <Badge variant="success"><Check className="mr-1 h-3 w-3" /> Success</Badge>
            return <Badge variant="destructive">Fail</Badge>
        }
    },
]
