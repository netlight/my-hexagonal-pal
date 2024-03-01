// import {
//   type Expense,
//   type ExpenseId,
// } from "../../domain/model/expense/expense";
// import type BudgetPersistencePort from "../port/budgetPersistencePort";
// import { type BudgetApplicationService } from "../service/budgetApplicationService";
//
// export const offsetExpense =
//   (
//     ports: { persist: BudgetPersistencePort["persist"] },
//     appServices: { getBudgetBy: BudgetApplicationService["getById"] },
//   ) =>
//   async (
//     expenseId: ExpenseId,
//     description: string,
//     date: Date,
//   ): Promise<Expense> => {
//     const budget = await appServices.getBudgetBy(expenseId);
//     const offsetExpenseId = budget.offset(expenseId, description, date).id;
//     const updatedBudget = await ports.persist(budget);
//
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     return updatedBudget.getExpenseBy(offsetExpenseId)!;
//   };
//
// export default offsetExpense;
