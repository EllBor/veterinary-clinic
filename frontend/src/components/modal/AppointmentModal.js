import { NavLink } from "react-router-dom";
import "./styles/style-appointment.css"
const AppointmentModal = ({ isOpen, onClose, id }) => {
    return ( 
        <div>
        {isOpen && (
          <div className="overlay">
            <div className="modal-appointment">
              <div className="appointment-content">
                <p className="appointment-title">Вы записаны на приём!</p>
                <NavLink className="appointment-btn" onClick={onClose} to={`/account/${id}`}>
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