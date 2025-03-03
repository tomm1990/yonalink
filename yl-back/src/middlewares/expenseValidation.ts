import { body, param } from 'express-validator';

export const validateCreateExpense = [
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
];

export const validateExpenseId = [
    param('id').isInt().withMessage('ID must be a valid integer'),
];

export const validateUpdateExpense = [
    param('id').isInt().withMessage('Expense ID must be a valid integer'),
    body().custom((value) => {
        if (!Object.keys(value).length) {
            throw new Error('At least one field (description or amount) is required');
        }
        return true;
    }),
    body('description').optional().isString().notEmpty().withMessage('Description must be a non-empty string'),
    body('amount').optional().isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
];