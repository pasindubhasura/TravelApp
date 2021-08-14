const mongoose = require("mongoose");
const Destination = require("../models/destination");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json({ destinations });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/add", async (req, res) => {
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
});

module.exports = router;
