// Global routes
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users routes
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";
const ME = "/me";

// Toilet routes
const TOILETS = "/toilets";
const ADD = "/add";
const TOILET_DETAIL = "/:id";
const EDIT_TOILET = "/:id/edit";
const DELETE_TOILET = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  users: USERS,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  userDetail: USER_DETAIL,
  me: ME,
  toilets: TOILETS,
  add: ADD,
  toiletDetail: TOILET_DETAIL,
  editToilet: EDIT_TOILET,
  deleteToilet: DELETE_TOILET,
};

export default routes;
