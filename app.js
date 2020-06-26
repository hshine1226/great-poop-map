import express from "express";
// Middlewares
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import toiletRouter from "./routers/toiletRouter";
import usersRouter from "./routers/usersRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");

app.use("/static", express.static("static"));

// Middleware
app.use(morgan("dev")); // Logging에 도움을 주는 미들웨어
app.use(helmet()); // Express App에 도움을 주는 미들웨어
app.use(bodyParser.json()); // 서버가 json을 이해하게 해주는 미들웨어
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해하게 해주는 미들웨어
app.use(cookieParser()); // Session을 다루기 위한 미들웨어
app.use(localsMiddleware);

// Routers
app.use(routes.home, globalRouter);
app.use(routes.toilets, toiletRouter);
app.use(routes.users, usersRouter);
app.use(routes.api, apiRouter);

export default app;
