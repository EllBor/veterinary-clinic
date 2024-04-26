import React from "react";
import "./styles/style-thanksfeedback.css";

function ThanksFeedbackModel({ isOpen, onClose }) {
  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="modal-thanksfeedback">
            <div className="modal-content">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <p className="modal-title">Спасибо за отзыв!</p>
              <button className="modal-btn" onClick={onClose}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThanksFeedbackModel;
