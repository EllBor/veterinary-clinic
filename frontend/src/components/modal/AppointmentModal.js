import { NavLink } from "react-router-dom";
const AppointmentModal = ({ isOpen, onClose, id }) => {
    return ( 
        <div>
        {isOpen && (
          <div className="overlay">
            <div className="modal-thanksfeedback">
              <div className="modal-content">
                <span className="close" onClick={onClose}>
                  &times;
                </span>
                <p className="modal-title">Вы записаны на приём!</p>
                <NavLink className="modal-btn" onClick={onClose} to={`/account/${id}`}>
                  OK
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
     );
}
 
export default AppointmentModal;