import app from "./app";
import dotenv from "dotenv";
import "./db";

dotenv.config();

const PORT = process.env.PORT;

const handleListener = () =>
  console.log(`✅Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListener);
