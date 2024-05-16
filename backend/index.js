import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import cors from "cors";

import { registerValidation, updateValidation, createValidation, ReviewsValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as DoctorController from "./controllers/DoctorController.js";
import * as ReviewController from "./controllers/ReviewController.js";
import * as PetsController from "./controllers/PetsController.js";
import * as AppointmentController from "./controllers/AppointmentController.js";
import * as ServicesController from "./controllers/ServicesController.js";
import * as ReceiptController from "./controllers/ReceiptController.js";

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
    const originalname = file.originalname;
    const extension = originalname.split(".").pop(); 
    const uniqueFileName = `${uuidv4()}.${extension}`; 
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
  });
});

app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.delete("/users/:id", UserController.remove);
app.patch("/users/:id", updateValidation, UserController.update);
app.get("/users/:id", UserController.getOne);

app.get("/doctor", DoctorController.getAll);
app.get("/doctor/:id", DoctorController.getOne);
app.get("/doctor/:id/appointments", DoctorController.getDoctorAndNearestAppointment);
app.get("/service/:serviceId/doctor/:id/appointments", DoctorController.getDoctorServiceAndNearestAppointment);
app.get("/service/:id/doctors", DoctorController.getAllDoctorsWithAppointments);
app.post("/service/:serviceId/doctors/:doctorId/appointments", DoctorController.updateAppointmentStatus)

app.get("/doctor/:id/reviews", ReviewController.getAll);
app.post("/doctor/:doctorId/users/:userId/reviews", ReviewsValidation, ReviewController.create);
app.get('/doctor/services/:serviceId', ServicesController.getDoctorsByService);

app.post("/users/:userId/pets", checkAuth, createValidation, PetsController.create);
app.delete("/users/:userId/pets/:id", checkAuth, PetsController.remove);
app.patch("/users/:userId/pets/:id", checkAuth, createValidation, PetsController.update);
app.get("/users/:id/pets", checkAuth, PetsController.getAll);
app.get("/users/:userId/pets/:id", PetsController.getOne);
app.get("/medical-history/:petId", PetsController.getMedicalHistory);

app.get("/services/:id/appointments", ServicesController.getAllAppointments);
app.get("/services", ServicesController.getAllServices);
app.get("/services/:id", ServicesController.getOneServices);

app.get("/users/:id/appointments", AppointmentController.getAll);
app.post("/appointments/users/:userId/doctors/:doctorId/pets/:petId", AppointmentController.create);
app.delete("/users/:userId/appointments/:id", AppointmentController.remove);

app.post("/users/:id/receipt", ReceiptController.create);
app.get("/users/:id/receipt", ReceiptController.getAll);
app.get('/api/download-pdf/:fileName', ReceiptController.downloadPdf);


app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
