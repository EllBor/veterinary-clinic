import "../styles/style-appointment.css";
import { NavLink } from "react-router-dom";

const Appointment = () => {
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
              <NavLink to="/order-card">
              <div className="payment__item">
                <p className="payment__item-title">Онлайн-консультация</p>
                <span className="payment__item-price">2000 ₽</span>
              </div>
              </NavLink>
              <NavLink to="/order">
                <div className="payment__item">
                  <p className="payment__item-title">Прием в клинике</p>
                  <span className="payment__item-price">Бесплатно</span>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Appointment;
