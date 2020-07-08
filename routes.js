// Global routes
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users routes
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_PROFILE = "/:id";
const ME = "/me";

// Toilet routes
const TOILETS = "/toilets";
const ADD = "/add";
const TOILET_DETAIL = "/:id";
const EDIT_TOILET = "/:id/edit";
const DELETE_TOILET = "/:id/delete";

const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

// API routes
const API = "/api";
const GET_TOILETS = "/toilets";
const GET_BOX_TOILETS = "/toilets/box";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  users: USERS,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  userProfile: USER_PROFILE,
  me: ME,
  toilets: TOILETS,
  add: ADD,
  toiletDetail: TOILET_DETAIL,
  editToilet: EDIT_TOILET,
  deleteToilet: DELETE_TOILET,

  api: API,
  getToilets: GET_TOILETS,
  getBoxToilet: GET_BOX_TOILETS,

  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
};

export default routes;
