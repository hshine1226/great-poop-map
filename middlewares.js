import routes from "./routes";
import multer from "multer";

const multerAvatar = multer({
  dest: "uploads/avatars/",
});

export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "대똥여지도";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;

  next();
};
