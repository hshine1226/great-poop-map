import express from "express";
import routes from "../routes";
import {
  getBoxToilet,
  getNearToilets,
  getToiletDetail,
  checkEmail,
} from "../src/controllers/apiController";

const apiRouter = express.Router();
apiRouter.get(routes.nearToilets, getNearToilets);
apiRouter.post(routes.boxToilet, getBoxToilet);
apiRouter.get(routes.toiletDetail, getToiletDetail);
apiRouter.get(routes.checkEmail, checkEmail);

export default apiRouter;
