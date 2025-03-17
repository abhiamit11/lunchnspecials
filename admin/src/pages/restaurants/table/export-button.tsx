import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { FileDown } from 'lucide-react';
import { exportManyRestaurant } from '../api';
import { DataTableProps } from './types';
import { CSVDownload } from "react-csv";

interface Props<TData> extends DataTableProps<TData> {
    rows: Row<TData>[]
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
                const { _id } = row.original as { _id: string }
                ids.push(_id)
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
                className="h-8"
                onClick={onSelectedRowDownload}
            >
                <FileDown />
                Download
            </Button>

            {isSuccess && <CSVDownload data={data.data} filename={"restaurants_update_file.csv"} />}
        </>
    )
}

export default ExportButton