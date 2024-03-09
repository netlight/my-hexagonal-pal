import { Router } from "express";

// Express router bundling all individual routes of our app
const ApiRouter = (...routers: Router[]): Router => {
  const router = Router();
  routers.forEach((r) => router.use(r));

  return router;
};

export default ApiRouter;
