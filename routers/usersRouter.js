import express from "express";
import routes from "../routes";
import {
  getUsers,
  getEditProfile,
  getChangePassword,
  getUserDetail,
  getMe,
} from "../controllers/userControllers";

const usersRouter = express.Router();

usersRouter.get(routes.home, getUsers);
usersRouter.get(routes.editProfile, getEditProfile);
usersRouter.get(routes.changePassword, getChangePassword);
usersRouter.get(routes.me, getMe);
usersRouter.get(routes.userDetail, getUserDetail);

export default usersRouter;
