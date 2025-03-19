import { Divider, Snackbar, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ExpenseTable } from "../components/ExpenseTable";
import { MonthlyExpenseSummary } from "../components/MonthlyExpenseSummary";
import { SearchInput } from "../components/SearchInput";
import useExpenses from "../hooks/useExpenses";
import { Filter } from "../types/Filter";

const DEFAULT_FILTER: Filter = {
    // sortBy: 'updatedAt',
    sortDirection: 'desc'
};

export const Main = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filter: Filter = {
        ...DEFAULT_FILTER,
        sortDirection: searchParams.get('sortDirection') as 'asc' | 'desc' ?? DEFAULT_FILTER.sortDirection,
        description: searchParams.get('description') || undefined
    }

    const { GetExpenses } = useExpenses();
    const { data = [], isError, error, isLoading } = GetExpenses(filter);

    const handleFilterChange = <T extends keyof Filter>(key: T, value: Filter[T]): void => {
        setSearchParams((prevSearchParams) => {
            if (prevSearchParams.get(key) === value) {
                return prevSearchParams;
            }

            const newSearchParams = new URLSearchParams(prevSearchParams);
            if (value) {
                newSearchParams.set(key, value);
            } else {
                newSearchParams.delete(key);
            }

            return newSearchParams;
        })
    }

    const total = useMemo(() => data.reduce((acc, expense) => acc + Number(expense.amount), 0), [data]);

    if (isError) {
        console.error(error);
    }

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Typography variant="h3">Main page</Typography>
            <SearchInput onInputChange={handleFilterChange} />
            <MonthlyExpenseSummary total={total} filter={filter} isLoading={isLoading} />
            <ExpenseTable data={data} filter={filter} onSortChange={handleFilterChange} />
            <Snackbar
                open={isError}
                autoHideDuration={6000}
                message="Not able to fetch results"
            />
        </Stack>
    )
}
