import passport from "passport";
import routes from "../../routes";
import User from "../../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;

  const user = await User.findOne({ email });
  if (password !== password2) {
    res.status(400); // 잘못된 요청
    res.render("join", { pageTitle: "Join" });
  } else if (user) {
    console.log("이메일 중복");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      // 미들웨어 수행후 다음으로 넘어가기
      next();
    } catch (error) {
      // console.log(error);
      res.redirect(routes.home);
    }
    // To Do: Log user in
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
export const getUsers = (req, res) =>
  res.render("index", { pageTitle: "Users" });

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email, nickname },
    file,
  } = req;

  try {
    await User.findByIdAndUpdate(req.user._id, {
      name,
      email,
      nickname,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("index", { pageTitle: "Change Password" });

export const getUserProfile = async (req, res) => {
  const {
    user: { _id: id },
  } = req;

  try {
    const user = await User.findById(id);
    // console.log(user);
    res.render("profile", { pageTitle: "User Profile", user });
  } catch (error) {
    res.redirect("/");
  }
};

export const getMe = (req, res) => {
  res.render("profile", { pageTitle: "User Detail", user: req.user });
};

export const naverLogin = passport.authenticate("naver");
export const naverLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, profile_image: avatarUrl, email, nickname: name },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.naverId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      naverId: id,
      name,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postNaverLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");
export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      properties: { nickname: name, profile_image: avatarUrl },
      kakao_account: { email },
    },
  } = profile;

  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      kakaoId: id,
      name,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};
export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};
