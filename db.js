import mongoose from "mongoose";
import Toilet from "./models/Toilet";
import fs from "fs";

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

const setLoc = (long, latt) => {
  const toilet = new Toilet({
    name: "잠실",
    address: "서울시 잠실구",
    openTime: "09:00~18:00",
    location: {
      type: "Point",
      coordinates: [long, latt],
    },
  });

  toilet.save((err, message) => {
    if (err) console.log(err);
    console.log(message);
  });
};

export const findNearToilet = async (long, latt) => {
  try {
    const toilet = await Toilet.find({
      location: {
        $near: {
          // distance in meters
          $maxDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [long, latt],
          },
        },
      },
    });
    return toilet;
  } catch (err) {
    console.log(err);
  }
};

const saveJsonToDb = () => {
  fs.readFile("./data/toilet_data.json", "utf8", (err, data) => {
    if (err) throw err;
    const toilet_data = JSON.parse(data);
    for (const i in toilet_data.records) {
      if (toilet_data.records[i].경도 & toilet_data.records[i].위도) {
        const toilet = new Toilet({
          name: toilet_data.records[i].화장실명,
          address: toilet_data.records[i].소재지지번주소,
          openTime: toilet_data.records[i].개방시간,
          location: {
            type: "Point",
            coordinates: [
              parseFloat(toilet_data.records[i].경도),
              parseFloat(toilet_data.records[i].위도),
            ],
          },
        });
        toilet.save((err, message) => {
          if (err) console.log(err);
          // console.log(message);
        });
      }
    }
  });
};

// saveJsonToDb();
