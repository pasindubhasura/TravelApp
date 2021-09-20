//import statements
const mongoose = require("mongoose");
const Destination = require("../models/destination");
const Accommodation = require("../models/accommodation");
const Guides = require("../models/guide");
const Vehicles = require("../models/travelVehicle");
const router = require("express").Router();
const imgbbUploader = require("imgbb-uploader");
const validator = require("../functions/validator");
const { validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json({ destinations });
  } catch (error) {
    res.json({ error });
  }
}); //get all destination records

router.get("/get_one/:id", async (req, res) => {

  const id = req.params.id;
  
  try {
    const destination = await Destination.findById(id);
    if (destination == null) {
      return res.json({ error: "No such destination" });
    }
    res.json({ destination });
  } catch (error) {
    res.json({ error });
  }
}); //get one destination record

router.post("/add", async (req, res) => {

  //variables
  const destination = await new Destination();
  destination.destination = req.body.destination;
  destination.city = req.body.city;
  destination.district = req.body.district;
  destination.province = req.body.province;
  destination.description = req.body.description;
  destination.image = req.body.image;

  try {
    await destination.save();
    res.json({ success: "Record added successfully!" });
  } catch (error) {
    res.json({ error: "Record added failed!" });
  }
}); //add destination record

router.post(
  "/update",
  async (req, res) => {
    try {
      const id = req.body.id;
      const destination = await Destination.findById(id);

      destination.destination = req.body.destination;
      destination.city = req.body.city;
      destination.district = req.body.district;
      destination.province = req.body.province;
      destination.description = req.body.description;
      destination.image = req.body.image;

      await destination.save();
      res.json({ success: "Record Successfully Updated!" });
    } catch (error) {
      res.json({ error: "Couldn't update the Record!" });
    }
  }
); //update destination record

router.post("/delete", async (req, res) => {
  const id = req.body.id;

  try {
    await Destination.findByIdAndDelete(id);
    res.json({ success: "Record Successfully Deleted!" });
  } catch (error) {
    res.json({ error: "Couldn't delete the Record!" });
  }
}); //delete destination record

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

router.get("/getCount" , async (req,res) => {
  const destinationC = await Destination.count((err, count) => {
    console.log(count)
  })
  const accommodationC = await Accommodation.count((err, count) => {
    console.log(count)
    
  })
  const vehiclesC = await Vehicles.count((err, count) => {
    console.log(count)
  })
  const guidesC = await Guides.count((err, count) => {
    console.log(count)
  })
  return res.json({destinationC,accommodationC,vehiclesC,guidesC});
})//document counter 

module.exports = router;
