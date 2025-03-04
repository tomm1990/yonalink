import { Router } from 'express';
import { getExpenses, postExpense, patchExpense, deleteExpense, downloadExpensesCSV } from '../controllers/expenseController';
import { validateCreateExpense, validateExpenseId, validateUpdateExpense } from '../middlewares/expenseValidation';

const router = Router();

router.get('/', getExpenses);
router.post('/', validateCreateExpense, postExpense);
router.patch('/:id', validateExpenseId, validateUpdateExpense, patchExpense);
router.delete('/:id', validateExpenseId, deleteExpense);
router.get('/download', downloadExpensesCSV);

export default router;
