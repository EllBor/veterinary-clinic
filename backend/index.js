import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import { registerValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as DoctorController from "./controllers/DoctorController.js";
import * as ReviewController from "./controllers/ReviewController.js";
import * as PetsController from "./controllers/PetsController.js";
import * as AppointmentController from "./controllers/AppointmentController.js";
import * as ServicesController from "./controllers/ServicesController.js";

mongoose
  .connect(
    "mongodb+srv://geeldeee:1234567890@cluster0.rdqgbqz.mongodb.net/veterinary-clinic?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("MongoDB OK");
  })
  .catch((err) => {
    console.log("MongoDB error", err);
  });

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.delete("/users/:id", UserController.remove);
app.patch("/users/:id", UserController.update);
app.get("/users/:id", UserController.getOne);

app.get("/doctor", DoctorController.getAll);
app.get("/doctor/:id", DoctorController.getOne);
app.get("/doctor/:id/appointments", DoctorController.getDoctorAndNearestAppointment);

app.get("/doctor/:id/reviews", ReviewController.getAll);
app.post("/doctor/:doctorId/users/:userId/reviews", ReviewController.create);

app.post("/users/:userId/pets", checkAuth, PetsController.create);
app.delete("/users/:userId/pets/:id", PetsController.remove);
app.patch("/users/:userId/pets/:id", checkAuth, PetsController.update);
app.get("/users/:id/pets", checkAuth, PetsController.getAll);
app.get("/users/:userId/pets/:id", checkAuth, PetsController.getOne);

app.get("/services/:id/appointments", ServicesController.getAllAppointments);
app.get("/services", ServicesController.getAllServices);

//вывести запись на приема в лчином кабинете пользвоателя
app.get("/users/:userId/appointments", AppointmentController.getAll);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
