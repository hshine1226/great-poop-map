import fs from "fs";
import Toilet from "../../models/Toilet";

export const getHome = (req, res) => res.render("home", { pageTitle: "Home" });

export const getToilets = async (req, res) => {
  const toilets = JSON.parse(
    fs.readFileSync(__dirname + "/../../data/" + "toilet_data.json", "utf-8")
  );

  const toiletData = [];
  const records = toilets.records;

  // for (let i = 0, len = 5; i < len; i++) {
  for (let i = 0, len = records.length; i < len; i++) {
    const type = records[i].구분;
    const name = records[i].화장실명;
    const address = records[i].소재지지번주소;
    const unisexToilet = records[i].남녀공용화장실여부;
    const openTime = records[i].개방시간;

    const newToilet = await Toilet.create({
      type,
      name,
      address,
      unisexToilet,
      openTime,
    });

    console.log(newToilet);
  }

  res.render("toilets", { pageTitle: "Toilets" });
};
export const getAdd = (req, res) =>
  res.render("index", { pageTitle: "Add Toilets" });
export const getToiletDetail = (req, res) =>
  res.render("index", { pageTitle: "Toilet Detail" });
export const getEditToilet = (req, res) =>
  res.render("index", { pageTitle: "Edit Toilet" });
export const getDeleteToilet = (req, res) =>
  res.render("index", { pageTitle: "Delete Toilet" });
