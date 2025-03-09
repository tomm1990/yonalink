import { Edit } from '@mui/icons-material';
import { Button, Chip, IconButton, Paper, Table, TableContainer, TableSortLabel, Typography } from "@mui/material";
import { ColumnDef, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { Category } from '../types/Category';
import { Expense } from "../types/Expense";
import { Filter } from "../types/Filter";
import { EditDialog } from "./dialog/EditDialog";
import { TableBody } from "./table/TableBody";
import { TableHead } from "./table/TableHead";

interface ExpenseTableProps {
  data: Expense[];
  filter?: Filter;
  onSortChange: (value: 'asc' | 'desc' | undefined) => void;
}

export const ExpenseTable = ({ data, filter, onSortChange }: ExpenseTableProps) => {
  const [selectedItem, setSelectedItem] = useState<Expense>();

  const memoizedSelectedItem = useMemo(() => selectedItem, [selectedItem]);
  const setSelectedItemCallback = useCallback(setSelectedItem, [setSelectedItem]);
  const handleCloseDialogCallback = useCallback(() => {
    setSelectedItem(undefined);
  }, []);

  const handleOpenDialog = (item: Expense) => {
    setSelectedItem(item);
  };

  const SHARED_COLUMNS_MAP = useMemo<Record<string, ColumnDef<Expense>>>(
    () => ({
      actions: {
        id: "actions",
        header: () => {
          // TODO make Partial when possible
          return <Button variant="contained" onClick={() => {
            handleOpenDialog({
              id: 0,
              description: 'new item',
              amount: 10,
              createdAt: new Date(),
              updatedAt: new Date(),
              category: null
            })
          }}>New</Button>
        },
        cell: ({ row: { original } }) => (
          <IconButton
            onClick={() => { handleOpenDialog(original); }}
          >
            <Edit />
          </IconButton>
        ),
      },
    }),
    []
  );

  const desktopColumns = useMemo((): ColumnDef<Expense>[] => [
    {
      id: "id",
      accessorKey: "id",
      header: "ID",
      cell: ({ getValue }) => <Typography>{`${getValue()}`}</Typography>,
    },
    {
      id: "description",
      accessorKey: "description",
      header: "Description",
      cell: ({ getValue }) => <Typography>{`${getValue()}`}</Typography>,
    },
    {
      id: "amount",
      accessorKey: "amount",
      header: "Amount",
      cell: ({ getValue }) => `$${getValue<number>()}`,
    },
    {
      id: "category",
      accessorKey: "category",
      header: "Category",
      cell: ({ getValue }) => {
        const category = getValue<Category | null>();
        if (!category) {
          return null;
        }
        return <Chip key={category.id} label={category.name} />;
      },
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: () => (
        <TableSortLabel
          active
          direction={filter?.sortDirection}
          onClick={() => {
            onSortChange(filter?.sortDirection === 'asc' ? 'desc' : 'asc');
          }}
        >
          Updated At
        </TableSortLabel>
      ),
      cell: ({ getValue }) => `${new Date(getValue<Date>()).toDateString()}`,
    },
    SHARED_COLUMNS_MAP.actions,
  ], [filter, onSortChange, SHARED_COLUMNS_MAP]);  // ✅ Dependencies


  const table = useReactTable({
    data,
    columns: desktopColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead getHeaderGroups={table.getHeaderGroups} />
          <TableBody getRowModel={table.getRowModel()} />
        </Table>
      </TableContainer>
      <EditDialog
        item={memoizedSelectedItem}
        mode={memoizedSelectedItem?.id ? 'edit' : 'add'}
        onClose={handleCloseDialogCallback}
        setSelectedItem={setSelectedItemCallback}
      />
    </>
  );
}
