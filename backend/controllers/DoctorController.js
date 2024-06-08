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
        const slug = req.params.slug;
        const doctor = await DoctorModel.findOne({slug: slug});
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
    const slug = req.params.slug;
    const doctor = await DoctorModel.findOne({slug: slug});
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

export const getDoctorServiceAndNearestAppointment = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const serviceId = req.params.serviceId; 
    
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Врач не найден' });
    }

    const appointmentsForService = doctor.appointment_dates.filter(appointment => 
      appointment.service_id.toString() === serviceId &&
      appointment.status === 'активен'
    );

    const sortedAppointments = appointmentsForService.sort((a, b) => {
      return new Date(a.start_date_time) - new Date(b.start_date_time);
    });
    
    if (sortedAppointments.length === 0) {
      return res.status(404).json({ message: 'Не найдено записей на прием для данного врача на указанную услугу' });
    }
    res.status(200).json({ sortedAppointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить даты приемов",
    });
  }
};


export const getAllDoctorsWithAppointments = async (req, res) => {
  try {
    const serviceId = req.params.id; 
    const doctors = await DoctorModel.find({
      "appointment_dates.service_id": serviceId
    }).lean();

    const doctorsWithAppointments = await Promise.all(doctors.map(async (doctor) => {
      const appointmentsForService = doctor.appointment_dates.filter(appointment =>
        appointment.service_id.toString() === serviceId
      );

      const sortedAppointments = appointmentsForService.sort((a, b) => {
        return new Date(a.start_date_time) - new Date(b.start_date_time);
      });
      const nearestAppointment = sortedAppointments[0];

      return {
        ...doctor,
        nearestAppointment,
      };
    }));
    res.status(200).json({ doctorsWithAppointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить врачей и их записи на прием по этой услуге",
    });
  }
};


export const updateAppointmentStatus = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const serviceId = req.params.serviceId;
    const startDateTime = new Date(req.body.appointment_date_time).getDate();
    const newStatus = req.body.newStatus;
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      throw new Error('Врач не найден');
    }

    const appointment = doctor.appointment_dates.find(appointment => 
      appointment.start_date_time.getDate() === startDateTime &&
      appointment.service_id.toString() === serviceId
    );

    if (!appointment) {
      throw new Error('Запись о приеме не найдена');
    }

    appointment.status = newStatus;
    await doctor.save();
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Ошибка при обновлении статуса записи о приеме:', error);
    throw error; 
  }
};
