import express from "express";
import helmet from "helmet";
import environment from "../../../config/environment";
import expressLogger from "./logging/expressLogger";
import ApiRouter from "./routes/apiRouter";
import { errorHandler } from "./middleware/error/errorHandler";
import * as OpenApiValidator from "express-openapi-validator";
import * as path from "node:path";
import createBudgetUseCase from "../../../../core/application/usecase/createBudgetUseCase";
import BudgetMongoPersistenceAdapter from "../../out/budget/persistence/mongo/budgetMongoPersistenceAdapter";
import {
  getIncomeStreamById,
  type IncomeStreamApplicationService,
} from "../../../../core/application/service/IncomeStreamApplicationService";
import IncomeStreamMongoPersistenceAdapter from "../../out/income/persistence/mongo/incomeMongoPersistenceAdapter";
import findBudgetUseCase from "../../../../core/application/usecase/findBudgetUseCase";
import {
  type BudgetApplicationService,
  getBudgetByExpenseId,
  getBudgetById,
} from "../../../../core/application/service/budgetApplicationService";
import BudgetRouter from "../budget/http/budgetRouter";
import ExpenseRouter from "../expense/http/expenseRouter";
import trackExpenseUseCase from "../../../../core/application/usecase/trackExpenseUseCase";
import IncomeStreamRouter from "../income/http/incomeRouter";
import getAllIncomeStreams from "../../../../core/application/usecase/getAllIncomeStreamsUseCase";
import createIncomeUseCase from "../../../../core/application/usecase/openNewIncomeStreamUseCase";
import registerEarningUseCase from "../../../../core/application/usecase/registerEarningUseCase";
import cors from "cors";
import * as process from "node:process";
import getAllBudgetsUseCase from "../../../../core/application/usecase/getAllBudgetsUseCase";

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
    apiSpec: path.join(process.cwd(), "api", "my-finance-pal.yml"),
    // validate incoming requests
    validateRequests: true,
    // also validate our responses to the clients
    // validateResponses: true,
  }),
);

// Instantiate dependencies and pass them to the respective components needed for our use cases
const budgetAppService: BudgetApplicationService = {
  findBy: getBudgetById({
    getBudgetBy: BudgetMongoPersistenceAdapter.findBy,
  }),
  findForExpenseId: getBudgetByExpenseId({
    getBudgetBy: BudgetMongoPersistenceAdapter.findForExpenseId,
  }),
};
const incomeStreamAppService: IncomeStreamApplicationService = {
  findBy: getIncomeStreamById({
    findBy: IncomeStreamMongoPersistenceAdapter.findBy,
  }),
};
const budgetRouter = BudgetRouter(
  createBudgetUseCase({
    getAllBudgets: BudgetMongoPersistenceAdapter.findAll,
    getAllIncomeStreams: IncomeStreamMongoPersistenceAdapter.findAll,
    persist: BudgetMongoPersistenceAdapter.persist,
  }),
  getAllBudgetsUseCase({
    findAllBudgets: BudgetMongoPersistenceAdapter.findAll,
  }),
  findBudgetUseCase({
    findBy: BudgetMongoPersistenceAdapter.findBy,
  }),
);
const expenseRouter = ExpenseRouter(
  trackExpenseUseCase(
    { persist: BudgetMongoPersistenceAdapter.persist },
    { getBudgetBy: budgetAppService.findBy },
  ),
);
const incomeStreamRouter = IncomeStreamRouter(
  getAllIncomeStreams({
    findAllIncomeStreams: IncomeStreamMongoPersistenceAdapter.findAll,
  }),
  createIncomeUseCase({ persist: IncomeStreamMongoPersistenceAdapter.persist }),
  registerEarningUseCase(
    { persist: IncomeStreamMongoPersistenceAdapter.persist },
    { getIncomeStreamBy: incomeStreamAppService.findBy },
  ),
);

const apiRouter = ApiRouter(budgetRouter, expenseRouter, incomeStreamRouter);
app.use(apiRouter);

// IMPORTANT! Always add an error handler to avoid unexpected crashes of the app!
// If not caught, every exception will lead to Node.js terminating the process!
// Also place the error handler at the end of your app configuration as this should
// be the last middleware that is called, so we can handle any error that might occur before!
app.use(errorHandler);

export default app;
