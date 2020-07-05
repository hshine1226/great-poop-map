import express from "express";
import routes from "../routes";
import {
  getUsers,
  getEditProfile,
  getChangePassword,
  getUserProfile,
  postEditProfile,
} from "../src/controllers/userController";
import { uploadAvatar } from "../middlewares";

const usersRouter = express.Router();

usersRouter.get(routes.home, getUsers);

usersRouter.get(routes.editProfile, getEditProfile);
usersRouter.post(routes.editProfile, uploadAvatar, postEditProfile);

usersRouter.get(routes.changePassword, getChangePassword);

usersRouter.get(routes.userProfile, getUserProfile);

export default usersRouter;
