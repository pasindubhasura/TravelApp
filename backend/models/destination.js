const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Destination = new Schema(
  {
    destination: { type: String },
    city: { type: String },
    district: { type: String },
    province: { type: String },
    description: { type: String },
    image: { type: String },
  },
  { collection: "destinations" }
);

module.exports = mongoose.model("Destination", Destination);
