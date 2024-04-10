import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import { registerValidation } from "./validations/auth.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as DoctorController from "./controllers/DoctorController.js";
import * as ReviewController from "./controllers/ReviewController.js";
import * as PetsController from "./controllers/PetsController.js";

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

app.use(express.json());
app.use(cors());

app.post('/auth/login', UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);
app.get('/users/:id', UserController.getOne);

app.get('/doctor', DoctorController.getAll);
// app.get('/doctor:id', DoctorController.getOne);

app.get('/reviews/:doctorId', ReviewController.getAll);

app.get('/users/:id/pets', checkAuth, PetsController.getAll);
app.get('/users/:id/pets/:petId', checkAuth, PetsController.getOne);
// app.get('/users/:userId/pets/create', checkAuth, PetsController.create);
// app.get('/users/:userId/pets/update:petId', checkAuth, PetsController.update);
// app.get('/users/:userId/pets/delete:petId', checkAuth, PetsController.delete);


//вывести врача и ближайшую дату приема на определенную услугу
//вывести запись на приема в лчином кабинете пользвоателя

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
