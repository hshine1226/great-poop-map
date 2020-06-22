export const getHome = (req, res) => res.render("home", { pageTitle: "Home" });
export const getToilets = (req, res) =>
  res.render("index", { pageTitle: "Toilets" });
export const getAdd = (req, res) =>
  res.render("index", { pageTitle: "Add Toilets" });
export const getToiletDetail = (req, res) =>
  res.render("index", { pageTitle: "Toilet Detail" });
export const getEditToilet = (req, res) =>
  res.render("index", { pageTitle: "Edit Toilet" });
export const getDeleteToilet = (req, res) =>
  res.render("index", { pageTitle: "Delete Toilet" });
