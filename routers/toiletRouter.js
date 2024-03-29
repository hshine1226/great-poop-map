import express from "express";
import routes from "../routes";
import {
  getAdd,
  getToiletDetail,
  getEditToilet,
  getDeleteToilet,
} from "../src/controllers/toiletController";

const toiletRouter = express.Router();

toiletRouter.get(routes.toiletDetail, getToiletDetail);
toiletRouter.get(routes.add, getAdd);
toiletRouter.get(routes.editToilet, getEditToilet);
toiletRouter.get(routes.deleteToilet, getDeleteToilet);

export default toiletRouter;
