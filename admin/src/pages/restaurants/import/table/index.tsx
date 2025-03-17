import { DataTable } from "./data-table"
import { columns } from "./columns"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getImportHistroy } from "../../api"

function ImportHistroy() {
    const { data, isSuccess } = useQuery({
        queryKey: ["import-histroy"], //Array according to Documentation
        queryFn: async () => await getImportHistroy(),
        placeholderData: keepPreviousData,
    });
    return (
        <>
            <div className="flex justify-between items-center p-4 rounded-lg">
                <h1 className="text-2xl font-medium">Import History</h1>
            </div>
            <div className="bg-background p-5 rounded-lg">
                <div className="container mx-auto">
                    {isSuccess && <DataTable data={data.data} columns={columns} />}
                </div>
            </div>
        </>
    )
}

export default ImportHistroy