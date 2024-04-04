import React, { useState } from 'react';

import "./styles/style-feedback.css";

import ThanksFeedbackModel from './ThanksFeedbackModel';

function FeedbackModel({ isOpen, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={onClose}>
                            &times;
                        </span>
                        <p className='modal-title'>Оставить отзыв</p>
                        <form className='modal-form'>
                            <textarea className='modal-text' placeholder='Отзыв'></textarea>
                        </form>
                        <button className='modal-btn' onClick={openModal}>ОТПРАВИТЬ</button>
                        <ThanksFeedbackModel isOpen={isModalOpen} onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedbackModel;
