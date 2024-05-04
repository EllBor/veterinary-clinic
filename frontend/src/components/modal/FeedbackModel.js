import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import "./styles/style-feedback.css";

import ThanksFeedbackModel from "./ThanksFeedbackModel";
import Rating from "../rating/Rating";
import { fetchReviews, fetchReviewsCreate } from "../../redux/slices/reviews";

function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const parts = token.split(".");
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1]));
      if (payload._id) {
        return payload._id;
      }
    }
  }
  return null;
}

function FeedbackModel({ isOpen, onClose, id }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const userIdFromToken = getUserIdFromToken();
    setUserId(userIdFromToken);
  }, []);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const params = { ...data, rating: rating };
      await dispatch(
        fetchReviewsCreate({ doctorId: id, userId: userId, params: params })
      );
      dispatch(fetchReviews(id));
      onClose();
      openModal();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <p className="modal-title">Оставить отзыв</p>
              <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                <Rating onChange={handleRatingChange} />
                <textarea
                  className="modal-text"
                  placeholder="Отзыв"
                  {...register("review_text", { required: "Напишите отзыв" })}
                ></textarea>
                <button className="modal-btn" type="submit">
                  ОТПРАВИТЬ
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <ThanksFeedbackModel isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default FeedbackModel;
