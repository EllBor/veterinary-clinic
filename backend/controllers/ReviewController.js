import ReviewsModel from "../models/Reviews.js";

export const getAll = async (req, res) => {
    try {
        const review = await ReviewsModel.find();
        if(!review) {
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

export const getOne = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await ReviewsModel.findById(reviewId);
        if(!review) {
            return res.status(404).json({
                message: "Отзыв не найден",
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
  
  