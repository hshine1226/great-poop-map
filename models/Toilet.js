import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
    unique: false,
  },
  unisexToilet: String,
  openTime: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

ToiletSchema.index({ location: "2dsphere" });

const model = mongoose.model("Toilet", ToiletSchema);

export default model;
