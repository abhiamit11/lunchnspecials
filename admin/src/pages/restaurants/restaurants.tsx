import { Button } from "@/components/ui/button";
import { columns } from "./table/columns"
import { DataTable } from "./table/data-table"
import { Copy, FileUp, Plus } from "lucide-react";
import { Link, useSearch } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getRestaurants } from "./api";
import { PaginationType } from "./types";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


function Restaurants() {
    const pagination: PaginationType = useSearch({ from: '' })
    const { data, isSuccess } = useQuery({
        queryKey: ["restaurants", pagination], //Array according to Documentation
        queryFn: async () => await getRestaurants(pagination),
        placeholderData: keepPreviousData,
    });

    if (isSuccess) {
        const { total, data: restaurants } = data
        return (
            <>
                <div className="flex justify-between items-center p-4 rounded-lg">
                    <h1 className="text-2xl font-medium">Restaurants</h1>

                    <div className="flex justify-end items-center gap-2">

                        <TooltipProvider delayDuration={200}>
                            <Tooltip data-side="bottom">
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" asChild>
                                        <Link to="/restaurants/duplicates">
                                            <Copy /> Duplicates
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm" side="bottom">
                                    <p>The function allows you to find and delete duplicate restaurant data in the system.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider delayDuration={200}>
                            <Tooltip data-side="bottom">
                                <TooltipTrigger asChild>
                                    <Button variant="outline" asChild>
                                        <Link to="/restaurants/import">
                                            <FileUp /> Import
                                        </Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm" side="bottom">
                                    <p>The Import function allows you to seamlessly upload and integrate Restaurants data into the system from external CSV files.</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <Button variant="default" asChild><Link to="/restaurants/add"><Plus /> Add Restaurant</Link></Button>
                    </div>
                </div>
                <div className="rounded-lg bg-background mt-4 p-3 border border-foreground/20 shadow relative">
                    <DataTable
                        columns={columns}
                        data={restaurants}
                        rowCount={total}
                    />
                </div>
            </>
        )
    }
}

export default Restaurants