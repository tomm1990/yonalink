import { body, param } from 'express-validator';
import Category from '../models/Category'; // Import Category model for validation

export const validateCreateExpense = [
    body('description')
        .isString()
        .notEmpty()
        .withMessage('Description is required'),
    
    body('amount')
        .isFloat({ gt: 0 })
        .withMessage('Amount must be greater than 0'),
    
    body('categoryId')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Category ID must be a valid integer')
        .custom(async (value) => {
            const category = await Category.findByPk(value);
            if (!category) {
                throw new Error('Category ID does not exist');
            }
        }),
];

export const validateExpenseId = [
    param('id')
        .isInt()
        .withMessage('Expense ID must be a valid integer'),
];

export const validateUpdateExpense = [
    param('id')
        .isInt()
        .withMessage('Expense ID must be a valid integer'),

    body().custom((value) => {
        if (!Object.keys(value).length) {
            throw new Error('At least one field (description, amount, or categoryId) is required');
        }
        return true;
    }),

    body('description')
        .optional()
        .isString()
        .notEmpty()
        .withMessage('Description must be a non-empty string'),

    body('amount')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Amount must be a positive number'),

    body('categoryId')
        .optional({ nullable: true })
        .isInt()
        .withMessage('Category ID must be a valid integer')
        .custom(async (value) => {
            const category = await Category.findByPk(value);
            if (!category) {
                throw new Error('Category ID does not exist');
            }
        }),
];
