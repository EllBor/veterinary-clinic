import React from 'react';
import "./styles/style-city.css";
function CityModal({ isOpen, onClose }) {
  return (
    <div>
      {isOpen && (
        <div className="modal-city">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <p className='modal-title'>Ваш город</p>
            <ul className='modal-list'>
              <li className='modal-item'>Новосибирск</li>
              <li className='modal-item'>Кемерово</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityModal;
