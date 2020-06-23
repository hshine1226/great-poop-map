import mongoose from "mongoose";

const ToiletSchema = new mongoose.Schema({
  type: {
    type: String,
    // required: "Type is required",
  },
  name: {
    type: String,
    // required: "Name is required",
  },
  address: {
    type: String,
    // required: "Adrress is required",
  },
  unisexToilet: String,
  openTime: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

const model = mongoose.model("Toilet", ToiletSchema);

export default model;
