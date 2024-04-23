import ReviewsModel from "../models/Reviews.js";
import DoctorModel from "../models/Doctor.js";


export const create = async (req, res) => {
  try {
    const doc = new ReviewsModel({
      review_text: req.body.review_text,
      rating: req.body.rating,
      publication_date: req.body.publication_date,
      user: req.params.userId,
      doctor: req.params.doctorId,
    });
    const review = await doc.save();
    res.json([review]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать отзыв",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctorExists = await DoctorModel.exists({ _id: doctorId });
    if (!doctorExists) {
      return res.status(404).json({
        message: "Врач не найден",
      });
    }
    const reviews = await ReviewsModel.find({ doctor: doctorId });

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "Отзывы не найдены",
      });
    }

    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить отзыв",
    });
  }
};
