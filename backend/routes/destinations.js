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

router.post("/update", async (req, res) => {
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
});

router.delete("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await Destination.findByIdAndDelete(id);
    res.json({ success: "Record Successfully Deleted!" });
  } catch (error) {
    res.json({ error: "Couldn't delete the Record!" });
  }
});

module.exports = router;
