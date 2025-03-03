import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Expense } from '../models';
import { FilterParams } from '../types/FilterParams';
import { validationResult } from 'express-validator';

export const getExpenses = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log('errors', errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            sortBy = 'createdAt',
            sortDirection = 'DESC',
            startDate,
            endDate,
            pageIndex = '1',
            pageSize = '10',
        }: FilterParams = req.query;

        const validSortBy = ['createdAt', 'updatedAt'].includes(sortBy) ? sortBy : 'createdAt';
        const validSortDirection = ['ASC', 'DESC'].includes(sortDirection) ? sortDirection : 'DESC';

        const parsedPageIndex = Math.max(0, parseInt(pageIndex, 10) || 0);
        const parsedPageSize = Math.max(1, parseInt(pageSize, 10) || 10);

        const whereClause: any = {};
        if (startDate || endDate) {
            whereClause[validSortBy] = {};
            if (startDate) {
                whereClause[validSortBy][Op.gte] = new Date(startDate);
            }
            if (endDate) {
                whereClause[validSortBy][Op.lte] = new Date(endDate);
            }
        }

        // Fetch filtered and sorted expenses along with total sum aggregation
        const { rows: expenses, count: totalRecords } = await Expense.findAndCountAll({
            where: whereClause,
            order: [[validSortBy, validSortDirection]],
            limit: parsedPageSize,
            offset: parsedPageIndex * parsedPageSize,
        });

        // Calculate total amount
        // TODO think if needed
        // const totalAmount = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

        res.status(200).json({
            // totalAmount,
            totalRecords,
            pageIndex: parsedPageIndex,
            pageSize: parsedPageSize,
            expenses,
        });
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
        const { description, amount } = req.body;
        const newExpense = await Expense.create({ description, amount });
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
