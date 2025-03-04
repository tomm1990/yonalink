import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Parser } from 'json2csv';
import { Category, Expense } from '../models';
import { FilterParams } from '../types/FilterParams';

export const downloadExpensesCSV = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    interface ExpenseWithCategory extends Expense {
        category?: { name: string };
    }

    try {
        const {
            sortBy = 'updatedAt',
            sortDirection = 'desc',
        }: FilterParams = req.query;

        const validSortBy = ['createdAt', 'updatedAt'].includes(sortBy) ? sortBy : 'updatedAt';
        const validSortDirection = ['asc', 'desc'].includes(sortDirection) ? sortDirection : 'desc';

        const expenses: ExpenseWithCategory[] = await Expense.findAll({
            order: [[validSortBy, validSortDirection]],
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
        });

        const expenseData = expenses.map(expense => ({
            id: expense.id,
            description: expense.description,
            amount: expense.amount,
            category: expense?.category ? expense.category.name : '-',
        }));

        const json2csvParser = new Parser();
        const csvData = json2csvParser.parse(expenseData);

        res.header('Content-Type', 'text/csv');
        res.attachment('expenses.csv');
        res.status(200).send(csvData);
    } catch (error) {
        console.error('Error generating CSV:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getExpenses = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            sortBy = 'updatedAt',
            sortDirection = 'desc',
        }: FilterParams = req.query;

        const validSortBy = ['createdAt', 'updatedAt'].includes(sortBy) ? sortBy : 'updatedAt';
        const validSortDirection = ['asc', 'desc'].includes(sortDirection) ? sortDirection : 'desc';

        const expenses = await Expense.findAll({
            attributes: ['id', 'description', 'amount', 'updatedAt'],
            order: [[validSortBy, validSortDirection]],
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }
            ]
        })

        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const postExpense = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const createData = req.body;
        const newExpense = await Expense.create(createData);
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const patchExpense = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const updateData = req.body;

        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        const updatedExpense = await expense.update(updateData);

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        await expense.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
