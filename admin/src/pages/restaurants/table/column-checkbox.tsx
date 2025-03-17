import { Checkbox } from "@/components/ui/checkbox"
import { DataTableProps } from "./types";
import { CellContext } from "@tanstack/react-table";

export function ColumnsHeaderCheckbox<TData>({ table }: DataTableProps<TData>) {
    return (<Checkbox
        checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
    />)
};

export function ColumnsCellCheckbox<TData>({ row }: CellContext<TData, unknown>) {
    return (
        <div className="px-1.5">
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        </div>
    )
}