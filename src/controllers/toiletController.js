import Toilet from "../../models/Toilet";
// import map from "../../assets/js/map";

export const getHome = (req, res) => res.render("home", { pageTitle: "Home" });

export const getAdd = async (req, res) => {
  const toilet = await Toilet.find({});
  const name = toilet[0].name;
  const address = toilet[0].address;

  res.render("add", { pageTitle: "Add Toilets" });
};

export const getComments = (req, res) => {
  res.render("comments", { pageTitle: "Comments" });
};

export const getToiletDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const toilet = await Toilet.findById(id)
      .populate("creator")
      .populate("comments");

    res.render("toiletDetail", { pageTitle: "Toilet Detail", toilet });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditToilet = (req, res) =>
  res.render("index", { pageTitle: "Edit Toilet" });
export const getDeleteToilet = (req, res) =>
  res.render("index", { pageTitle: "Delete Toilet" });
