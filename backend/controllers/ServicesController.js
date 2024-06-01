import mongoose from "mongoose";

import DoctorModel from "../models/Doctor.js";
import ServiceModel from "../models/Services.js";


export const getAllServices = async (req, res) => {
  try {
    const services = await ServiceModel.find();
    if (!services) {
      return res.status(404).json({
        message: "Услуга не найдена",
      });
    }
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при получении информации о врачах",
    });
  }
};


export const getOneServices = async (req, res) => {
  try {
    const slug = req.params.slug;
    console.log(slug);
    const services = await ServiceModel.findOne({slug: slug});
    if (!services) {
      return res.status(404).json({
        message: "Услуга не найдена",
      });
    }
    res.json(services);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при получении информации о врачах",
    });
  }
};

export const getDoctorsByService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;

    const doctors = await DoctorModel.find({
      "appointment_dates.service_id": serviceId
    });

    res.json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при извлечении докторов",
    });
  }
};