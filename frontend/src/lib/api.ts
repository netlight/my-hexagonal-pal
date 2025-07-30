import { Configuration, BudgetsApi, ExpensesApi, IncomeApi } from '../generated/api/src';

const configuration = new Configuration({
  basePath: 'http://localhost:3000',
});

export const budgetsApi = new BudgetsApi(configuration);
export const expensesApi = new ExpensesApi(configuration);
export const incomeApi = new IncomeApi(configuration);

export { configuration };