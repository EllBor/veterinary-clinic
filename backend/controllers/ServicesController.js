import mongoose from "mongoose";

import DoctorServiceModel from "../models/DoctorService.js";
import DoctorModel from "../models/Doctor.js";
import AppointmentModel from "../models/Appointments.js";
import ServiceModel from "../models/Services.js";

export const getAllAppointments = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await ServiceModel.findOne({ _id: serviceId });
    if (!service) {
      return res.status(404).json({
        message: "Услуга не найдена",
      });
    }

    const doctorServices = await DoctorServiceModel.find({
      service_id: service._id,
    });
    if (doctorServices.length === 0) {
      return res.status(404).json({
        message: "Врачи, занимающиеся этой услугой, не найдены",
      });
    }

    const doctorsWithAppointments = await Promise.all(
      doctorServices.map(async (doctorService) => {
        const doctor = await DoctorModel.findById(doctorService.doctor_id);
        if (!doctor) {
          return null;
        }
        const appointment = await AppointmentModel.findOne({
          doctor: doctor._id,
          status: "активен",
        }).sort({ appointment_date_time: 1 });
        return {
          doctor,
          appointmentDate: appointment
            ? appointment.appointment_date_time
            : null,
        };
      })
    );

    const doctorsWithNearestAppointment = doctorsWithAppointments.filter(
      (doctorInfo) => doctorInfo && doctorInfo.appointmentDate
    );

    res.json({ doctorsWithNearestAppointment });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при получении информации о врачах",
    });
  }
};

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
    const serviceId = req.params.id
    const services = await ServiceModel.findById(serviceId);
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

    const doctorServices = await DoctorServiceModel.find({
      service_id: new mongoose.Types.ObjectId(serviceId)
    }).populate('doctor_id');

    const doctors = doctorServices.map(ds => ds.doctor_id);

    res.json(doctors);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при извлечении докторов",
    });
  }
};
