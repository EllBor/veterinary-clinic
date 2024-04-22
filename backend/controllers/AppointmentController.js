import AppointmentsModel from "../models/Appointments.js";
import UserModel from "../models/User.js";
import DoctorModel from "../models/Doctor.js";
import DoctorServiceModel from "../models/DoctorService.js";
import ServicesModel from "../models/Services.js";

// export const getAll = async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const userExists = await UserModel.exists({ _id: userId });
//       if (!userExists) {
//         return res.status(404).json({
//           message: "Пользователь не найден",
//         });
//       }
//       const appointment = await AppointmentsModel.find({ user: userId });
//       if (!appointment) {
//         return res.status(404).json({
//           message: "Запись на приём не найдена",
//         });
//       }
//       res.json(appointment);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         message: "Не удалось получить запись на приём",
//       });
//     }
//   };

  export const getAll = async (req, res) => {
    try {

        const userId = req.params.id;
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
          return res.status(404).json({
                      message: "Пользователь не найден",
                    });
        }

        const appointment = await AppointmentsModel.findOne({ user: user._id });
        if (!appointment) {
          return res.status(404).json({
                      message: "Запись на приём не найдена",
                    });
        }

        const doctor = await DoctorModel.findById(appointment.doctor);
        if (!doctor) {
          return res.status(404).json({
                      message: "Врач не найден",
                    });
        }

        const pet = await PetModel.findOne({ user: user._id });
        if (!pet) {
          return res.status(404).json({
            message: "Питомец не найден",
          });
        }

        const doctorService = await DoctorServiceModel.findOne({ doctor_id: doctor._id });
        if (!doctorService) {
          return res.status(404).json({
            message: "Информация об услуге не найдена",
          });
        }
        const service = await ServicesModel.findById(doctorService.service_id);
        if (!service) {
          return res.status(404).json({
            message: "Информация об услуге не найдена",
          });
        }
        res.json ({
            user: user.fullName,
            appointmentDateTime: appointment.appointment_date_time,
            doctor: doctor.fullName,
            petName: pet.name,
            serviceName: service.service_name
        });
    } catch (error) {
      console.log(error);
            res.status(500).json({
              message: "Не удалось получить запись на приём",
            });
    }
};