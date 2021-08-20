const express = require("express");
const router = express.Router();
let Vehicle = require("../models/travelVehicle");
//const imgbbUploader = require("imgbb-uploader");

//Add Vehicles
router.post("/add", (req, res) => {
  console.log("in post");
  let newVehicle = new Vehicle(req.body);

  //javascript promise = then
  newVehicle
    .save()
    .then((res) => {
      console.log("Successfully Created!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all details
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({ vehicles });
  } catch (error) {
    res.json({ error });
  }
});

//update
router.put("/update/:vehicleId", async (req, res) => {
  let vId = req.params.vehicleId;
  //const name = req.body.name; mehema gannath puluwan
  //b structure karanna puluwan ekaparinma eka peliyen
  const {
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
router.get("/get/:vehicleId", async (req, res) => {
  const vId = req.params.vehicleId;
  const reqC = await Vehicle.findById(vId)
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
