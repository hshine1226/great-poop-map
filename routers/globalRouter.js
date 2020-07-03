import express from "express";
import routes from "../routes";
import { getHome } from "../src/controllers/toiletController";
import {
  getJoin,
  getLogin,
  getLogout,
  postJoin,
  postLogin,
  postLogout,
} from "../src/controllers/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, postLogout);

export default globalRouter;
