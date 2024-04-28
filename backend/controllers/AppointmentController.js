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
        return res.status(404).json({
            message: "Записи на приём не найдены",
        });
    }

      const doctor = await DoctorModel.find(appointments.doctor);
      if (!doctor) {
          return res.status(404).json({
              message: "Врач не найден",
          });
      }

      const pet = await PetModel.find(appointments.pet);
      if (!pet) {
          return res.status(404).json({
              message: "Питомец не найден",
          });
      }

      const response = appointments.map((_,index)=> ({
          appointmentDateTime: appointments[index].appointment_date_time,
          doctor: doctor[index].fullName,
          petName: pet[index].name
      }));

      res.json(response);
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: "Не удалось получить записи на приём",
      });
  }
};