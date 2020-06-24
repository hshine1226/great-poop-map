import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/great-poop-map", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
