
import {
    TableHead as MuiTableHead,
    TableCell,
    TableRow
} from "@mui/material";
import { Table, flexRender } from "@tanstack/react-table";
import { Expense } from "../../types/Expense";

export const TableHead = ({ getHeaderGroups }: Pick<Table<Expense>, "getHeaderGroups">) => {
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