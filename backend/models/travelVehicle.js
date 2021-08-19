const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
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

const Vehicle = mongoose.model("travelVehicle", vehicleSchema);

module.exports = mongoose.model("room", roomSchema);
