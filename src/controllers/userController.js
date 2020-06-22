export const getJoin = (req, res) => res.render("index", { pageTitle: "Join" });
export const getLogin = (req, res) =>
  res.render("index", { pageTitle: "Login" });
export const getLogout = (req, res) =>
  res.render("index", { pageTitle: "Logout" });
export const getUsers = (req, res) =>
  res.render("index", { pageTitle: "Users" });
export const getEditProfile = (req, res) =>
  res.render("index", { pageTitle: "Edit Profile" });
export const getChangePassword = (req, res) =>
  res.render("index", { pageTitle: "Change Password" });
export const getUserDetail = (req, res) =>
  res.render("index", { pageTitle: "User Detail" });
export const getMe = (req, res) => res.render("index", { pageTitle: "Me" });
