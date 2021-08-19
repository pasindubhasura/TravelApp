const router = require("express").Router();
let vehicle = require("../models/travelVehicle");

//Add Vehicles
router.route("/travelVehicle/add").post((req, res) => {
  const vehicleId = req.body.vehicleId;
  const vehicleType = req.body.vehicleType;
  const vehicleLocation = req.body.vehicleLocation;
  const vehiclePricePerkm = req.body.vehiclePricePerkm;
  const vehiclePhone = req.body.vehiclePhone;
  const vehicleAvailability = req.body.vehicleAvailability;

  const newVehicle = new vehicle({
    vehicleId,
    vehicleType,
    vehicleLocation,
    vehiclePricePerkm,
    vehiclePhone,
    vehicleAvailability,
  });

  //javascript promise = then
  newVeVehicle
    .save()
    .then(() => {
      res.json("New Vehicle Added!");
    })
    .catch((err) => {
      console.log(err);
    });
});
