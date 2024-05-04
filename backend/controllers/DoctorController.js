import DoctorModel from "../models/Doctor.js";
import DoctorServiceModel from "../models/DoctorService.js";

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
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Врач не найден' });
    }
    const appointmentDates = doctor.appointment_dates.sort((a, b) => {
      return new Date(a.start_date_time) - new Date(b.start_date_time);
    });
    const nearestAppointment = appointmentDates[0];
    if (!nearestAppointment) {
      return res.status(404).json({ message: 'Не найдено записей на прием для данного врача' });
    }
    res.status(200).json({ nearestAppointment });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить ближайшую дату приема",
    });
  }
};

export const getAllDoctorsWithAppointments = async (req, res) => {
  try {
    const id = req.params.id;
    const doctorServices = await DoctorServiceModel.find({ service_id: id }).lean();
    const doctorIds = doctorServices.map((docServ) => docServ.doctor_id);
    const doctors = await DoctorModel.find({ _id: { $in: doctorIds } }).lean();

    const doctorsWithAppointments = await Promise.all(doctors.map(async (doctor) => {
      const closestAppointmentDate = doctor.appointment_dates
        .sort((a, b) => a.start_date_time - b.start_date_time)
        .map((appointment) => appointment.start_date_time)[0];
      return {
        ...doctor,
        closestAppointmentDate,
      };
    }));

    res.status(200).json({ doctorsWithAppointments });
  } catch (error) {
    console.log(error);
      res.status(500).json({
        message: "Не удалось получить врачей по этой услуге",
      });
  }
  };