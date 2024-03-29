// Global routes
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";

// Users routes
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Toilet routes
const TOILETS = "/toilets";
const TOILET_DETAIL = "/:id";
const ADD = "/:id/add";
const EDIT_TOILET = "/:id/edit";
const DELETE_TOILET = "/:id/delete";

const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/auth/kakao/callback";

// API routes
const API = "/api";
const GET_NEAR_TOILETS = "/toilets";
const GET_BOX_TOILETS = "/toilets/box";
const CHECK_EMAIL = "/users/:email";
const ADD_COMMENT = "/:id/comment";
const DEL_COMMENT = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  users: USERS,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  toilets: TOILETS,
  add: ADD,
  editToilet: EDIT_TOILET,
  deleteToilet: DELETE_TOILET,

  api: API,
  nearToilets: GET_NEAR_TOILETS,
  boxToilet: GET_BOX_TOILETS,
  toiletDetail: TOILET_DETAIL,
  checkEmail: CHECK_EMAIL,
  addComment: ADD_COMMENT,
  delComment: DEL_COMMENT,

  naver: NAVER,
  naverCallback: NAVER_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
};

export default routes;
