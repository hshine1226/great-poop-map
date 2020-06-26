import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
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
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: [Number],
  },
});

ToiletSchema.index({ location: "2dsphere" });

const model = mongoose.model("Toilet", ToiletSchema);

export default model;
