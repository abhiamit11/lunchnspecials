import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { FileDown } from 'lucide-react';
import { exportManyRestaurant } from '../api';
import { DataTableProps } from './types';
import { CSVDownload } from "react-csv";

interface Props<TData> extends DataTableProps<TData> {
    rows: string[]
}


function ExportButton<TData>({ rows, table }: Props<TData>) {

    const { mutate, isSuccess, data } = useMutation({
        mutationFn: exportManyRestaurant,
        onSuccess: () => {
            setTimeout(() => {
                table.resetRowSelection()
            }, 1000);
        },
    })

    const onSelectedRowDownload = () => {
        try {
            const ids: string[] = []
            rows.forEach(row => {
                // const { _id } = row.original as { _id: string }
                ids.push(row)
            });
            mutate({ ids })
        } catch (error) {

        }
    }

    return (
        <>
            <Button
                variant={'outline'}
                type="button"
                size={"sm"}
                className="h-8 relative px-5"
                onClick={onSelectedRowDownload}
            >
                <FileDown />
                Download
                {rows.length > 0 && <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-background bg-foreground border-2 rounded-full -top-2 -end-2 dark:border-gray-900">{rows.length || 0}</div>}
            </Button>
            {isSuccess && <CSVDownload data={data.data} filename={"restaurants_update_file.csv"} />}
        </>
    )
}

export default ExportButton