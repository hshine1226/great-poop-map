import Toilet from "../../models/Toilet";
// import map from "../../assets/js/map";

export const getHome = (req, res) => res.render("home", { pageTitle: "Home" });

export const getToilets = async (req, res) => {
  res.render("toilets", { pageTitle: "Toilets" });
};

export const getAdd = async (req, res) => {
  console.log(Toilet);
  const toilet = await Toilet.find({});
  const name = toilet[0].name;
  const address = toilet[0].address;

  console.log(name, "&", address);

  res.render("add", { pageTitle: "Add Toilets" });
};

export const getToiletDetail = (req, res) =>
  res.render("index", { pageTitle: "Toilet Detail" });
export const getEditToilet = (req, res) =>
  res.render("index", { pageTitle: "Edit Toilet" });
export const getDeleteToilet = (req, res) =>
  res.render("index", { pageTitle: "Delete Toilet" });
