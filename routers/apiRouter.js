import express from "express";
import routes from "../routes";
import {
  getBoxToilet,
  getNearToilets,
  getToiletDetail,
  checkEmail,
  postAddComment,
} from "../src/controllers/apiController";

const apiRouter = express.Router();
apiRouter.get(routes.nearToilets, getNearToilets);
apiRouter.post(routes.boxToilet, getBoxToilet);
apiRouter.get("/toilets/:id", getToiletDetail);
apiRouter.get(routes.checkEmail, checkEmail);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
