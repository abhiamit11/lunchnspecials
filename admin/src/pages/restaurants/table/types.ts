import { Column, Table } from "@tanstack/react-table";

export interface DataTableProps<TData> {
  table: Table<TData>;
}

export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}
