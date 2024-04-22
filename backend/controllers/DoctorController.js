import DoctorModel from "../models/Doctor.js";

export const getAll = async (req, res) => {
    try {
        const doctor = await DoctorModel.find();
        if(!doctor) {
            return res.status(404).json({
                message: "Врачи не найдены",
            });
        }
        res.json(doctor);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось получить врача",
      });
    }
};

export const getOne = async (req, res) => {
    try {
        const doctorId = req.params.id;
        const doctor = await DoctorModel.findById(doctorId);
        if(!doctor) {
            return res.status(404).json({
                message: "Врач не найден",
            });
        }
        res.json([doctor]);

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Не удалось получить врача",
      });
    }
};
  
export const getDoctorAndNearestAppointment = async (req, res) => {
  try {
      const doctorId = req.params.id;
      
      const nearestAppointment = await DoctorModel.findOne({ _id: doctorId })
                                                 .sort({ start_date_time: 1 })
                                                 .limit(1);

      if (!nearestAppointment) {
          return res.status(404).json({ message: 'Не найдено записей на прием для данного врача' });
      }

      res.status(200).json({ nearestAppointment });
  } catch (error) {
      console.error("Ошибка при получении данных о враче и ближайшей дате приема:", error);
      res.status(500).json({ message: 'Ошибка сервера' });
  }
};