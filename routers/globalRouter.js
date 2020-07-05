import express from "express";
import routes from "../routes";
import { getHome } from "../src/controllers/toiletController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
  naverLogin,
  postNaverLogin,
  kakaoLogin,
  postKakaoLogin,
  getMe,
} from "../src/controllers/userController";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
  routes.naverCallback,
  passport.authenticate("naver", { failureRedirect: "/login" }),
  postNaverLogin
);

globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  postKakaoLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;
