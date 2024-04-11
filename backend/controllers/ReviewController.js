import ReviewsModel from "../models/Reviews.js";
import DoctorModel from "../models/Doctor.js";

export const getAll = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctorExists = await DoctorModel.exists({ _id: doctorId });
    if (!doctorExists) {
      return res.status(404).json({
        message: "Врач не найден",
      });
    }
    const review = await ReviewsModel.find({ doctor: doctorId });
    if (!review) {
      return res.status(404).json({
        message: "Отзывы не найдены",
      });
    }
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить отзыв",
    });
  }
};
