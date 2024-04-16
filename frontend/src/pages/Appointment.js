import "../styles/style-appointment.css";

import { useSelector} from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { selectIsAuth } from "../redux/slices/auth";

const Appointment = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const handleConsultationClick = () => {
    if (!isAuth) {
      navigate('/login');
    } else {
      navigate('/order');
    }
  };

  const handleOnlineConsultationClick = () => {
    if (!isAuth) {
      navigate('/login');
    } else {
      navigate('/order-card');
    }
  };

  return (
    <main>
      <section className="appointment">
        <div className="container">
          <div className="appointment__inner">
            <h1 className="appointment__title">Запись на прием</h1>
            <div className="payment">
              <NavLink className="appointment__back" to="/">
                НАЗАД
              </NavLink>
        
                <button className="payment__btn" onClick={handleOnlineConsultationClick}>
                    <div className="payment__item">
                      <p className="payment__item-title">Онлайн-консультация</p>
                      <span className="payment__item-price">2000 ₽</span>
                  </div>
                </button>

 
                <button className="payment__btn" onClick={handleConsultationClick}>
                  <div className="payment__item">
                    <p className="payment__item-title">Прием в клинике</p>
                    <span className="payment__item-price">Бесплатно</span>
                  </div>
                </button>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Appointment;
