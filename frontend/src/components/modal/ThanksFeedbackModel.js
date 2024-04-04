import React from 'react';
import "./styles/style-thanksfeedback.css";

function ThanksFeedbackModel({ isOpen, onClose }) {
  return (
    <div>
      {isOpen && (
        <div className="modal-thanksfeedback">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <p className='modal-title'>
            Спасибо! Мы рассмотрим Ваш отзыв 
            и опубликуем его в ближайшее время
            </p>
            <button className='modal-btn' onClick={onClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThanksFeedbackModel;
