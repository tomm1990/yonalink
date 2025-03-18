import { UseQueryResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ExpenseApi from "../services/expense.api";
import { Expense } from "../types/Expense";
import { Filter } from "../types/Filter";

const useExpenses = () => {
    const queryClient = useQueryClient();

    const GetExpenses = (filter: Filter): UseQueryResult<Expense[]> =>
        useQuery<Expense[]>({
            queryKey: ["expenses", { ...filter }],
            queryFn: ({ signal }) => ExpenseApi.get({ signal, filter }),
        });

    const createExpenseMutation = useMutation({
        mutationFn: (expense: Expense) => {
            const createdExpense = {
                ...expense,
                categoryId: expense.category != null ? expense.category.id : null
            }
            return ExpenseApi.create(createdExpense)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"], exact: false });
        }
    })

    const deleteExpenseMutation = useMutation({
        mutationFn: (id: Expense['id']) => ExpenseApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"], exact: false });
        }
    });

    const updateExpenseMutation = useMutation({
        mutationFn: (expense: Expense) => {
            const updatedExpense = {
                ...expense,
                categoryId: expense.category != null ? expense.category.id : null
            }
            return ExpenseApi.update(updatedExpense)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["expenses"], exact: false });
        }
    })

    return {
        GetExpenses,
        deleteExpenseMutation,
        updateExpenseMutation,
        createExpenseMutation
    };
};

export default useExpenses;
