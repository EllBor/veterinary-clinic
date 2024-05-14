import AppointmentsModel from "../models/Appointments.js";
import UserModel from "../models/User.js";
import DoctorModel from "../models/Doctor.js";
import PetModel from "../models/Pets.js";

export const getAll = async (req, res) => {
  try {
    const usersId = req.params.id;
    const user = await UserModel.findById(usersId);
    if (!user) {
      return res.status(404).json({
        message: "Пользоваель не найден",
      });
    }

    const appointments = await AppointmentsModel.find({ user: usersId });
    if (!appointments || appointments.length === 0) {
      return res.json([]);
    }
    
    const response = [];
    for (const appointment of appointments) {
      const doctor = await DoctorModel.findById(appointment.doctor);
      if (!doctor) {
        return res.status(404).json({
          message: "Врач не найден",
        });
      }
    
      const pet = await PetModel.findById(appointment.pet);
      if (!pet) {
        return res.status(404).json({
          message: "Питомец не найден",
        });
      }
    
      response.push({
        appointmentId: appointment._id,
        appointmentDateTime: appointment.appointment_date_time,
        doctor: doctor.fullName,
        petName: pet.name,
      });
    }
    
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить записи на приём",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new AppointmentsModel({
      user: req.params.userId,
      doctor: req.params.doctorId,
      pet: req.params.petId,
      appointment_date_time: req.body.appointment_date_time,
      status: "запланирован",
      problems: req.body.problems,
      type: req.body.type,
      clinic_address: req.body.clinic_address,
      online_consultation_link: req.body.online_consultation_link,
    });
    const app = await doc.save();
    res.json([app]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать запись на приём",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const userId = req.params.userId;
    await AppointmentsModel.deleteOne({ _id: appointmentId, user: userId });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить запись на приём",
    });
  }
};
