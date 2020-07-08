import express from "express";
import routes from "../routes";
import {
  getBoxToilet,
  getNearToilets,
  getToiletDetail,
} from "../src/controllers/apiController";

const apiRouter = express.Router();
apiRouter.get(routes.nearToilets, getNearToilets);
apiRouter.post(routes.boxToilet, getBoxToilet);
apiRouter.get(routes.toiletDetail, getToiletDetail);

export default apiRouter;
