const express = require("express");
const router = express.Router();
let Vehicle = require("../models/travelVehicle");

//Add Vehicles
router.post("/travelVehicle/add", (req, res) => {
  let newVehicle = new Vehicle(req.body);

  //javascript promise = then
  newVeVehicle.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Vehicle Created Successfully !",
    });
  });
});

//get details
router.get("/travelVehicle/").get((req, rea) => {
  //execute body by calling model
  vehicle
    .find()
    .then((Vehicle) => {
      res.json(Vehicle);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update
router.route("/travelVehicle/update/:vehicleId").put(async (req, res) => {
  let vId = req.params.vehicleId;
  //const name = req.body.name; mehema gannath puluwan
  //b structure karanna puluwan ekaparinma eka peliyen
  const {
    vehicleId,
    vehicleType,
    vehicleLocation,
    vehiclePricePerkm,
    vehiclePhone,
    vehicleAvailability,
  } = req.body;

  //update karanna kalin object ekak hadaganna oni
  const updateVehicle = {
    vehicleType,
    vehicleLocation,
    vehiclePricePerkm,
    vehiclePhone,
    vehicleAvailability,
  };

  //vId eka athule user kenek innawada kiyala balanawa
  //if condition eka dala karannath puluwan, nathuwa karannath puluwan
  const update = await vehicle
    .findByIdAndUpdate(vId, updateVehicle)
    .then(() => {
      res.status(200).send({ status: "Request Updated Successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete
router.route("/travelVehicle/delete/:vehicleId").delete(async (req, res) => {
  let vId = req.params.vehicleId;

  await vehicle
    .findByIdAndDelete(cReqId)
    .then(() => {
      res.status(200).send({ status: "Request Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete Request", error: err.message });
    });
});

//eka user kenekge witharak data gannawa
router.route("/travelVehicle/get/:vehicleId").get(async (req, res) => {
  let vId = req.params.vehicleId;
  const reqC = await vehicle
    .findById(vId)
    .then((Vehicle) => {
      res.status(200).send({ status: "Request Fetched", Vehicle });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get request", error: err.message });
    });
});

module.exports = router;
