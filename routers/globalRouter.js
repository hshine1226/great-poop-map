import express from "express";
import routes from "../routes";
import { getHome } from "../controllers/toiletController";
import { getJoin, getLogin, getLogout } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.join, getJoin);
globalRouter.get(routes.login, getLogin);
globalRouter.get(routes.logout, getLogout);

export default globalRouter;
