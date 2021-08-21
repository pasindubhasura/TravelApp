const mongoose = require("mongoose");
const Vehicle = require("../models/travelVehicle");
const router = require("express").Router();
const imgbbUploader = require("imgbb-uploader");
//const validator = require("../functions/validator");
const { validationResult } = require("express-validator");

//get all vehicle records
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json({ vehicles });
  } catch (error) {
    res.json({ error });
  }
});

//get one
router.get("/getOne/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const vehicle = await Vehicle.findById(id);
    if (vehicle == null) {
      return res.json({ error: "No such vehicle" });
    }
    res.json({ vehicle });
  } catch (error) {
    res.json({ error });
  }
});

//add vehicle record
//router.post("/add", validator.validate("addVehicle"), async (req, res) => {
router.post("/add", async (req, res) => {
  const vehicle = await new Vehicle();
  vehicle.vehicleType = req.body.vehicleType;
  vehicle.vehicleLocation = req.body.vehicleLocation;
  vehicle.vehiclePricePerkm = req.body.vehiclePricePerkm;
  vehicle.vehiclePhone = req.body.vehiclePhone;
  vehicle.vehicleAvailability = req.body.vehicleAvailability;
  vehicle.image = req.body.image;

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({ error: errors.array() });
    return;
  }

  try {
    await vehicle.save();
    res.json({ success: "Record added successfully!" });
  } catch (error) {
    res.json({ error: "Record added failed!" });
  }
});

//update vehicle record
//router.post("/update", validator.validate("editVehicle"), async (req, res) => {
router.post("/update", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ error: errors.array() });
  }

  try {
    const id = req.body.id;
    const vehicle = await Vehicle.findById(id);

    vehicle.vehicleType = req.body.vehicleType;
    vehicle.vehicleLocation = req.body.vehicleLocation;
    vehicle.vehiclePricePerkm = req.body.vehiclePricePerkm;
    vehicle.vehiclePhone = req.body.vehiclePhone;
    vehicle.vehicleAvailability = req.body.vehicleAvailability;
    vehicle.image = req.body.image;

    await vehicle.save();
    res.json({ success: "Record Successfully Updated!" });
  } catch (error) {
    res.json({ error: "Couldn't update the Record!" });
  }
});

//delete vehicle record
router.post("/delete", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  try {
    await Vehicle.findByIdAndDelete(id);
    res.json({ success: "Record Successfully Deleted!" });
  } catch (error) {
    res.json({ error: "Couldn't delete the Record!" });
  }
});

//image handling
router.post("/upload", async (req, res) => {
  const path = req.body.path;

  const options = {
    apiKey: "b9873515ab55dff911b045133a42e546",
    base64string: path,
  };
  const response = await imgbbUploader(options);

  console.log(response.image.url);
  res.json({ imgUrl: response.image.url });
});

module.exports = router;
