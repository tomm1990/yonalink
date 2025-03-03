import { Router } from 'express';
import { getExpenses, postExpense, patchExpense, deleteExpense } from '../controllers/expenseController';
import { validateCreateExpense, validateExpenseId, validateUpdateExpense } from '../middlewares/expenseValidation';

const router = Router();

router.get('/expenses', getExpenses);
router.post('/expenses', validateCreateExpense, postExpense);
router.patch('/expenses/:id', validateExpenseId, validateUpdateExpense, patchExpense);
router.delete('/expenses/:id', validateExpenseId, deleteExpense);

export default router;
