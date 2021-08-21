const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vehicle = new Schema(
  {
    vehicleType: {
      type: String,
      require: true,
    },

    vehicleLocation: {
      type: String,
      require: true,
    },

    vehiclePricePerkm: {
      type: Number,
      require: true,
    },

    vehiclePhone: {
      type: String,
      requre: true,
    },

    vehicleAvailability: {
      type: String,
      default: "Available",
      require: true,
    },

    image: {
      type: String,
    },
  },

  {
    collections: "vehicles",
  }
);

module.exports = mongoose.model("Vehicle", Vehicle);
