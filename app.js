const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://testuser1:testuser1@cluster0.ozpuuan.mongodb.net/pet-boarding-db",
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PetBoarding = mongoose.model(
  "PetBoarding",
  new mongoose.Schema({
    bookingId: String,
    petName: String,
    petType: String,
    breed: String,
    age: String,
    weight: String,
    vaccinationStatus: String,
    ownerName: String,
    ownerPhone: String,
    ownerEmail: String,
    checkInDate: String,
    checkOutDate: String,
    kennelNumber: String,
  }),
);

app.get("/test", (req, res) => {
  res.send("Hello");
});

app.post("/add-data", async (req, res) => {
  try {
    await PetBoarding.create(req.body);

    res.json({
      status: "Pet Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

app.post("/view-data", async (req, res) => {
  try {
    const data = await PetBoarding.find();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
