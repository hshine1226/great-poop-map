import fs from "fs";
import app from "../../app";

export const getHome = (req, res) => res.render("home", { pageTitle: "Home" });

const getToiletData = (err, data) => {
  const toilets = JSON.parse(data);
  // console.log(toilets.records[0].화장실명);
  const records = toilets.records;

  for (let i = 0, len = records.length; i < len; i++) {
    let toiletObj = {};
    toiletObj["type"] = records[i].구분;
    toiletObj["name"] = records[i].화장실명;
    toiletObj["adrress"] = records[i].소재지지번주소;
    toiletObj["unisexToilet"] = records[i].남녀공용화장실여부;
    toiletObj["openTime"] = records[i].개방시간;
    toiletData.push(toiletObj);
  }
};

export const getToilets = (req, res) => {
  res.render("index", { pageTitle: "Toilets" });

  const toilets = JSON.parse(
    fs.readFileSync(__dirname + "/../../data/" + "toilet_data.json", "utf-8")
  );

  const toiletData = [];
  const records = toilets.records;

  for (let i = 0, len = records.length; i < len; i++) {
    let toiletObj = {};
    toiletObj["type"] = records[i].구분;
    toiletObj["name"] = records[i].화장실명;
    toiletObj["adrress"] = records[i].소재지지번주소;
    toiletObj["unisexToilet"] = records[i].남녀공용화장실여부;
    toiletObj["openTime"] = records[i].개방시간;
    toiletData.push(toiletObj);
  }
  // console.log(toiletData);
};
export const getAdd = (req, res) =>
  res.render("index", { pageTitle: "Add Toilets" });
export const getToiletDetail = (req, res) =>
  res.render("index", { pageTitle: "Toilet Detail" });
export const getEditToilet = (req, res) =>
  res.render("index", { pageTitle: "Edit Toilet" });
export const getDeleteToilet = (req, res) =>
  res.render("index", { pageTitle: "Delete Toilet" });
