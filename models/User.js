import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  email: { type: String, unique: true },
  // Add 'enum' of an array of options to force selection between a given number of options.
  // Anything other than "male" or "female" will be invalid.
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  avatarUrl: {
    type: String,
    default:
      "blob:https://fontawesome.com/080baef0-6a6e-4131-aa66-cf316ee95a59",
  },
  naverId: Number,
  googleId: Number,
  kakaoId: Number,
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);

export default model;
