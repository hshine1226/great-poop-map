import express from "express";
import routes from "../routes";
import { getToilets, getBoxToilet } from "../src/controllers/apiController";

const apiRouter = express.Router();
apiRouter.get(routes.getToilets, getToilets);
apiRouter.post(routes.getBoxToilet, getBoxToilet);

export default apiRouter;
