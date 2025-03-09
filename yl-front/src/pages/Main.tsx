import { Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ExpenseTable } from "../components/ExpenseTable";
import { MonthlyExpenseSummary } from "../components/MonthlyExpenseSummary";
import useExpenses from "../hooks/useExpenses";
import { Filter } from "../types/Filter";


export const Main = () => {
    const [filter, setFilter] = useState<Filter>({
        sortBy: 'updatedAt',
        sortDirection: 'desc'
    });

    const { GetExpenses } = useExpenses();
    const { data = [] } = GetExpenses(filter);

    const onSortChangeHandler = (value: 'asc' | 'desc' | undefined) => {
        setFilter((prevState) => ({
            ...prevState,
            sortDirection: value
        }));
    };

    const total = data.reduce((acc, expense) => acc + Number(expense.amount), 0);

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Typography variant="h3">Main page</Typography>
            {/* <SearchInput filter={filter} onChange={onInputChangeHandler} /> */}
            <MonthlyExpenseSummary total={total} filter={filter}/>
            <ExpenseTable data={data} filter={filter} onSortChange={onSortChangeHandler} />
        </Stack>
    )
}
