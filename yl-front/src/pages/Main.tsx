import { Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ExpenseTable } from "../components/ExpenseTable";
import { MonthlyExpenseSummary } from "../components/MonthlyExpenseSummary";
import useExpenses from "../hooks/useExpenses";
import { Filter } from "../types/Filter";

// const MOCK_EXPENSES: Expense[] = [
//     {
//         id: 1,
//         description: "Software Subscription",
//         amount: 97.03,
//         createdAt: new Date("2024-09-29T11:43:24.831884"),
//         updatedAt: new Date("2025-02-25T11:43:24.831908"),
//     },
//     {
//         id: 2,
//         description: "Conference Ticket",
//         amount: 405.45,
//         createdAt: new Date("2025-02-16T11:43:24.831919"),
//         updatedAt: new Date("2025-02-11T11:43:24.831925"),
//     },
//     {
//         id: 3,
//         description: "Hardware Purchase",
//         amount: 236.35,
//         createdAt: new Date("2024-03-24T11:43:24.831934"),
//         updatedAt: new Date("2025-02-04T11:43:24.831942"),
//     },
//     {
//         id: 4,
//         description: "Travel Expense",
//         amount: 253.46,
//         createdAt: new Date("2024-11-03T11:43:24.831951"),
//         updatedAt: new Date("2025-02-10T11:43:24.831956"),
//     },
//     {
//         id: 5,
//         description: "Marketing Ads",
//         amount: 306.61,
//         createdAt: new Date("2024-03-07T11:43:24.831969"),
//         updatedAt: new Date("2025-02-20T11:43:24.831975"),
//     },
//     {
//         id: 6,
//         description: "Team Lunch",
//         amount: 93.42,
//         createdAt: new Date("2024-06-18T11:43:24.831983"),
//         updatedAt: new Date("2025-02-10T11:43:24.831988"),
//     },
//     {
//         id: 7,
//         description: "Team Lunch",
//         amount: 403.83,
//         createdAt: new Date("2024-10-25T11:43:24.831996"),
//         updatedAt: new Date("2025-02-04T11:43:24.832000"),
//     },
//     {
//         id: 8,
//         description: "Internet Bill",
//         amount: 420.41,
//         createdAt: new Date("2024-03-31T11:43:24.832011"),
//         updatedAt: new Date("2025-02-24T11:43:24.832018"),
//     },
//     {
//         id: 9,
//         description: "Marketing Ads",
//         amount: 488.51,
//         createdAt: new Date("2024-04-20T11:43:24.832025"),
//         updatedAt: new Date("2025-02-24T11:43:24.832031"),
//     },
//     {
//         id: 10,
//         description: "Office Supplies",
//         amount: 60.17,
//         createdAt: new Date("2025-01-25T11:43:24.832039"),
//         updatedAt: new Date("2025-02-14T11:43:24.832044"),
//     },
// ];


export const Main = () => {
    const [filter, setFilter] = useState<Filter>({
        sortBy: 'updatedAt',
        sortDirection: 'desc'
    });

    const { getExpenses } = useExpenses();
    const { data = [], isLoading } = getExpenses(filter);

    const onSortChangeHandler = (value: 'asc' | 'desc' | undefined) => {
        console.log('onSortChangeHandler', value);
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
