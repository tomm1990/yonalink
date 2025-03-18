import { Divider, Snackbar, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { ExpenseTable } from "../components/ExpenseTable";
import { MonthlyExpenseSummary } from "../components/MonthlyExpenseSummary";
import { SearchInput } from "../components/SearchInput";
import useExpenses from "../hooks/useExpenses";
import { Filter } from "../types/Filter";

const DEFAULT_FILTER: Filter = {
    sortBy: 'updatedAt',
    sortDirection: 'desc'
};

export const Main = () => {
    const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

    const { GetExpenses } = useExpenses();
    const { data = [], isError, error, isLoading } = GetExpenses(filter);

    const onSortChangeHandler = (value: 'asc' | 'desc' | undefined) => {
        setFilter((prevState) => ({
            ...prevState,
            sortDirection: value
        }));
    };

    const total = useMemo(() => data.reduce((acc, expense) => acc + Number(expense.amount), 0), [data]);

    if (isError) {
        console.error(error);
    }

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Typography variant="h3">Main page</Typography>
            <SearchInput onChange={(value: string) => { console.log('value', value) }} />
            <MonthlyExpenseSummary total={total} filter={filter} isLoading={isLoading} />
            <ExpenseTable data={data} filter={filter} onSortChange={onSortChangeHandler} />
            <Snackbar
                open={isError}
                autoHideDuration={6000}
                message="Not able to fetch results"
            />
        </Stack>
    )
}
