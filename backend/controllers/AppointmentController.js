import AppointmentsModel from "../models/Appointments.js";
import UserModel from "../models/User.js";

export const getAll = async (req, res) => {
    try {
      const userId = req.params.id;
      const userExists = await UserModel.exists({ _id: userId });
      if (!userExists) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }
      const appointment = await AppointmentsModel.find({ user: userId });
      if (!appointment) {
        return res.status(404).json({
          message: "Запись на приём не найдена",
        });
      }
      res.json(appointment);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось получить запись на приём",
      });
    }
  };

  // export const getDoctorAndNearestAppointment = async (req, res) => {
  //   try {

  //     const userId = req.params.id;
  //     const nearestAppointment = await AppointmentsModel.findOne().sort({ start_date_time: 1 }.limit);
  
  //     if (!nearestAppointment) {
  //       return res.status(404).json({ message: 'Не найдено записей на прием для данной услуги' });
  //     }
  
  //     // Получаем информацию о враче
  //     const doctor = await Doctor.findById(nearestAppointment.doctor);
  
  //     // Отправляем на фронтенд данные о враче и ближайшей дате приема
  //     res.status(200).json({ doctor, nearestAppointment });
  //   } catch (error) {
  //     console.error("Ошибка при получении данных о враче и ближайшей дате приема:", error);
  //     res.status(500).json({ message: 'Ошибка сервера' });
  //   }
  // };