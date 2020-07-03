import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "대똥여지도";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;

  next();
};
