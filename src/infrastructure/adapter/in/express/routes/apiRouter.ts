import { Router } from "express";
import BudgetRouter from "../../budget/http/budgetRouter";
import ExpenseRouter from "../../expense/http/expenseRouter";
import { type CreateBudgetUseCase } from "../../../../../core/application/usecase/createBudgetUseCase";
import { type GetBudgetsUseCase } from "../../../../../core/application/usecase/getBudgetsUseCase";
import { type TrackExpenseUseCase } from "../../../../../core/application/usecase/trackExpenseUseCase";
import IncomeRouter from "../../income/http/incomeRouter";
import { type GetIncomesUseCase } from "../../../../../core/application/usecase/getIncomesUseCase";
import { type AddIncomeSourceUseCase } from "../../../../../core/application/usecase/addIncomeSourceUseCase";
import { type CreateIncomeUseCase } from "../../../../../core/application/usecase/createIncomeUseCase";

// Express router bundling all individual routes of our app
const ApiRouter = (
  createBudgetUseCase: CreateBudgetUseCase,
  getAllBudgetsUseCase: GetBudgetsUseCase,
  trackExpenseUseCase: TrackExpenseUseCase,
  getIncomesUseCase: GetIncomesUseCase,
  createIncomeUseCase: CreateIncomeUseCase,
  addIncomeSourceUseCase: AddIncomeSourceUseCase,
): Router => {
  const router = Router();
  router.use(BudgetRouter(createBudgetUseCase, getAllBudgetsUseCase));
  router.use(ExpenseRouter(trackExpenseUseCase));
  router.use(
    IncomeRouter(
      getIncomesUseCase,
      createIncomeUseCase,
      addIncomeSourceUseCase,
    ),
  );

  return router;
};

export default ApiRouter;
