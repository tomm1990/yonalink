
import {
    TableHead as MuiTableHead,
    TableCell,
    TableRow
} from "@mui/material";
import { Table, flexRender } from "@tanstack/react-table";
import { Expense } from "../../types/Expense";

interface TableHeadProps extends Pick<Table<Expense>, "getHeaderGroups"> { }

export const TableHead = ({ getHeaderGroups }: TableHeadProps) => {

    return (
        <MuiTableHead>
            {getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        const {
                            id,
                            column: { columnDef },
                            getContext,
                        } = header;
                        return (
                            <TableCell key={id} className={columnDef.meta?.className} >
                                {flexRender(columnDef.header, getContext())}
                            </TableCell>
                        );
                    })}
                </TableRow>
            ))}
        </MuiTableHead>
    );
}