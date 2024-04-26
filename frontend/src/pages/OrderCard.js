import React, { useState} from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { fetchServices, fetchDoctorsByService  } from '../redux/slices/services';
import { fetchDoctorAppointments } from '../redux/slices/doctors';

import card_success from "../images/card-success.svg";
import card_mir from "../images/card-mir.svg";
import master_card from "../images/master-card.svg";
import visa from "../images/visa.svg";

const OrderCard = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const doctors = useSelector((state) => state.doctors);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
const [selectedTime, setSelectedTime] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const isServicesLoading = services.status === "loading";
  const isDoctorsLoading = doctors.status === "loading";

 React.useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setSelectedDoctor('');
    if (event.target.value) {
      dispatch(fetchDoctorsByService(event.target.value)); 
    }
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
  };

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

              <div className="form__select">
                <select className="form__select-item" value={selectedService} onChange={handleServiceChange}>
                    <option value="">Выберите услугу</option>
                    {(isServicesLoading ? [...Array(3)] : services.items || []).map((obj, index) => 
                    isServicesLoading ? (
                      <option key={index}>
                        Услгу нет
                      </option>
                    ) : (
                      <option key={index} value={obj._id}>
                      {obj.service_name}
                    </option>
                    ))}
                  </select>

                  {selectedService && (
                    <select className='form__select-item' value={selectedDoctor} onChange={handleDoctorChange}>
                        <option value="">Выберите услугу</option>
                      {(isServicesLoading ? [...Array(3)] : services.items || []).map((obj, index) => 
                      isServicesLoading ? (
                        <option key={index}>
                          Услгу нет
                        </option>
                      ) : (
                        <option key={index} value={obj._id}>
                        {obj.fullName}
                      </option>
                      ))}
                    </select>
                  )}
              </div>
              <div className="order-info">
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Выберите дату"
                />
                <DatePicker
                  selected={selectedTime}
                  onChange={time => setSelectedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Время"
                  dateFormat="HH:mm"
                  placeholderText="Выберите время"
                />
              </div>
          
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
                <div className="order__card-input">
                  <div className="order__input-number">
                    <label className="order__label order__label-number" for="number">Номер карты</label>
                    <input className="order__input" type="number" id="number"/>
                  </div>
                  
                  <div className="order__input-owner">
                    <label className="order__label order__label-owner" for="owner">Владелец карты</label>
                    <input className="order__input" type="text" id="owner"/>
                  </div>
                  
                  <div className="order__input-date-cvv">
                      <label className="order__label order__label-date" for="date">Дата истечения срока действия</label>
                      <div className="order__date-wrapper">
                        <input className="order__date-cvv " type="text" id="date1"/>
                    </div>
                      <input className="order__date-cvv order__date" type="text" id="date"/>

                      <label className="order__label order__label-cvv" for="cvv2">CVV2</label>
                      <input className="order__date-cvv" type="text" id="cvv2"/>
                  </div>

                 
                </div>
              </div>
              <button className="top__slider-btn order-btn"  type="submit" >
                ЗАПИСАТЬСЯ
              </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderCard;
