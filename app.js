import express from "express";
// Middlewares
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import usersRouter from "./routers/usersRouter";
import toiletRouter from "./routers/toiletRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// Middleware
app.use(helmet()); // Express App에 도움을 주는 미들웨어
app.set("view engine", "pug");
app.use("/static", express.static("static"));

app.set("views", __dirname + "/src/views");

app.use(cookieParser()); // Session을 다루기 위한 미들웨어
app.use(bodyParser.json()); // 서버가 json을 이해하게 해주는 미들웨어
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해하게 해주는 미들웨어
app.use(morgan("dev")); // Logging에 도움을 주는 미들웨어
app.use(
  session({
    secret: "]-+~'I=U,.!wUOYKPj'cSx4%[Bgp`&",
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.toilets, toiletRouter);
app.use(routes.users, usersRouter);
app.use(routes.api, apiRouter);

export default app;
