import { Category } from "./Category";

export type Expense = {
    id: number;
    description: string;
    amount: number;
    createdAt: Date,
    updatedAt: Date,
    category: Category | null
}
