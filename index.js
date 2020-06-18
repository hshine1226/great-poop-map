import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;

// Middleware
app.use(morgan("dev")); // Logging에 도움을 주는 미들웨어
app.use(helmet()); // Express App에 도움을 주는 미들웨어
app.use(bodyParser.json()); // 서버가 json을 이해하게 해주는 미들웨어
app.use(bodyParser.urlencoded({ extended: true })); // 서버가 urlencoded를 이해하게 해주는 미들웨어
app.use(cookieParser()); // Session을 다루기 위한 미들웨어

const handleListening = () =>
  console.log(`👂Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
