import express from "express";
import helmet from "helmet";
import environment from "./config/environment";
import expressLogger from "./infrastructure/adapter/in/express/logging/expressLogger";
import ApiRouter from "./infrastructure/adapter/in/express/routes/apiRouter";
import { errorHandler } from "./infrastructure/adapter/in/express/middleware/error/errorHandler";
import * as OpenApiValidator from "express-openapi-validator";
import * as path from "path";
import createBudgetUseCase from "./core/application/usecase/createBudgetUseCase";
import BudgetMongoPersistenceAdapter from "./infrastructure/adapter/out/budget/persistence/mongo/budgetMongoPersistenceAdapter";
import {
  getIncomeById,
  type IncomeApplicationService,
} from "./core/application/service/IncomeApplicationService";
import IncomeMongoPersistenceAdapter from "./infrastructure/adapter/out/income/persistence/mongo/incomeMongoPersistenceAdapter";
import getBudgetsUseCase from "./core/application/usecase/getBudgetsUseCase";
import {
  type BudgetApplicationService,
  getBudgetByExpenseId,
  getBudgetById,
} from "./core/application/service/budgetApplicationService";
import BudgetRouter from "./infrastructure/adapter/in/budget/http/budgetRouter";
import ExpenseRouter from "./infrastructure/adapter/in/expense/http/expenseRouter";
import trackExpenseUseCase from "./core/application/usecase/trackExpenseUseCase";
import IncomeRouter from "./infrastructure/adapter/in/income/http/incomeRouter";
import getIncomesUseCase from "./core/application/usecase/getIncomesUseCase";
import createIncomeUseCase from "./core/application/usecase/createIncomeUseCase";
import addIncomeSourceUseCase from "./core/application/usecase/addIncomeSourceUseCase";
import cors from "cors";

const app = express();

// add a winston express logger middleware to log traffic and other events emitted by express
app.use(expressLogger);
// Enable JSON body parsing
app.use(express.json());
// allow parsing of URL encoded payloads
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors());

// add some additional security on PROD by setting some important HTTP headers automatically
if (environment.isProd) {
  app.use(helmet());
}

// validate payloads based on our OpenAPI specification. Fails if something
// does not meet the contract that we have defined and returns a verbose error
// message specifying what exactly is the problem
app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, "..", "api", "my-finance-pal.yml"),
    // validate incoming requests
    validateRequests: true,
    // also validate our responses to the clients
    // validateResponses: true,
  }),
);

// Instantiate dependencies and pass them to the respective components needed for our use cases
const budgetAppService: BudgetApplicationService = {
  getById: getBudgetById({
    getBudgetBy: BudgetMongoPersistenceAdapter.getById,
  }),
  getByExpenseId: getBudgetByExpenseId({
    getBudgetBy: BudgetMongoPersistenceAdapter.getByExpenseId,
  }),
};
const incomeAppService: IncomeApplicationService = {
  getById: getIncomeById({
    getIncomeBy: IncomeMongoPersistenceAdapter.getById,
  }),
};
const budgetRouter = BudgetRouter(
  createBudgetUseCase(
    {
      getAllBudgetsBy: BudgetMongoPersistenceAdapter.getAllByIncomeId,
      persist: BudgetMongoPersistenceAdapter.persist,
    },
    {
      getIncomeBy: incomeAppService.getById,
    },
  ),
  getBudgetsUseCase({
    getAllBudgetsBy: BudgetMongoPersistenceAdapter.getAllByIncomeId,
  }),
);
const expenseRouter = ExpenseRouter(
  trackExpenseUseCase(
    { persist: BudgetMongoPersistenceAdapter.persist },
    { getBudgetBy: budgetAppService.getById },
  ),
);
const incomeRouter = IncomeRouter(
  getIncomesUseCase({ getAllIncomes: IncomeMongoPersistenceAdapter.getAll }),
  createIncomeUseCase({ persist: IncomeMongoPersistenceAdapter.persist }),
  addIncomeSourceUseCase(
    { persist: IncomeMongoPersistenceAdapter.persist },
    { getIncomeBy: incomeAppService.getById },
  ),
);

const apiRouter = ApiRouter(budgetRouter, expenseRouter, incomeRouter);
app.use(apiRouter);

// IMPORTANT! Always add an error handler to avoid unexpected crashes of the app!
// If not caught, every exception will lead to Node.js terminating the process!
// Also place the error handler at the end of your app configuration as this should
// be the last middleware that is called, so we can handle any error that might occur before!
app.use(errorHandler);

export default app;
