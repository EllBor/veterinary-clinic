import { NavLink } from "react-router-dom";

import card_success from "../images/card-success.svg";
import card_mir from "../images/card-mir.svg";
import master_card from "../images/master-card.svg";
import visa from "../images/visa.svg";

const OrderCard = () => {
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
              <div className="order__card">
                <div className="order__card-top">
                  <div className="order__top-left">
                    <img src={card_success} alt="" />
                    <p>Оплата банковской карты</p>
                  </div>
                  <div className="order__top-right">
                    <img src={card_mir} alt="" />
                    <img src={master_card} alt="" />
                    <img src={visa} alt="" />
                  </div>
                </div>
              </div>
              <button className="top__slider-btn order-btn"  type="submit" >
                ЗАПИСАТЬСЯ
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderCard;
