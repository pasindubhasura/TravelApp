const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      require: true,
    },

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
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("room", roomSchema);
