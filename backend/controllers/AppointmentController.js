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
