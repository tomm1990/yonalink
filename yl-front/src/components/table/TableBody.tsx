import { TableBody as MuiTableBody, TableCell, TableRow } from "@mui/material";
import { RowModel, flexRender } from "@tanstack/react-table";
import { Expense } from "../../types/Expense";

interface TableBodyProps {
    getRowModel: RowModel<Expense>;
}

export const TableBody = ({ getRowModel }: TableBodyProps) => {
    return (
        <MuiTableBody>
            {getRowModel.rows.map((row) => (
                <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                        const {
                            id,
                            column: { columnDef },
                            getContext,
                        } = cell;
                        return (
                            <TableCell key={id} className={columnDef.meta?.className}>
                                {flexRender(columnDef.cell, getContext())}
                            </TableCell>
                        );
                    })}
                </TableRow>
            ))}
        </MuiTableBody>
    );
}