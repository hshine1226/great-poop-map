import passport from "passport";
import NaverStrategy from "passport-naver";
import User from "./models/User";
import { naverLoginCallback } from "./src/controllers/userController";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new NaverStrategy(
    {
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: `http://localhost:4000${routes.naverCallback}`,
    },
    naverLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
