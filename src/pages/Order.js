import { NavLink } from "react-router-dom";
const Order = () => {
  return (
    <main>
      <section className="appointment">
        <div className="container">
          <div className="appointment__inner order__inner">
            <h1 className="appointment__title">Оформление заказа</h1>
            <div className="order__box">
              <NavLink className="appointment__back back" to="/appointment">
                НАЗАД
              </NavLink>
              <form className="payment__form">
                <div className="personal">
                  <input
                    className="personal__input"
                    type="text"
                    placeholder="ФИО"
                  />
                  <input
                    className="personal__input"
                    placeholder="+7 (999) 999 99 99"
                  />
                </div>

                <div className="order-info">
                  <input
                    className="personal__input"
                    type="date"
                    placeholder="Дата и время"
                  />
                </div>

                <textarea
                  className="order-area"
                  placeholder="Кратко опишите проблему"
                ></textarea>
              </form>
              <button type="submit" className="top__slider-btn order-btn">
                ЗАПИСАТЬСЯ
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Order;
