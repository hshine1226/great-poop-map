import express from "express";
import routes from "../routes";
import {
  getMaps,
  postAddLatLng,
  getToilets,
  getToiletDetail,
} from "../src/controllers/apiController";

const apiRouter = express.Router();

apiRouter.get(routes.addMap, getMaps);
apiRouter.get(routes.addLatLng, postAddLatLng);
apiRouter.get(routes.getToilets, getToilets);
apiRouter.get(routes.getToiletDetail, getToiletDetail);

export default apiRouter;
