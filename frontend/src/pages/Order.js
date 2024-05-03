import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchServices, fetchDoctorsByService } from "../redux/slices/services";
import { fetchDoctorAppointments } from "../redux/slices/doctors";

const Order = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const doctors = useSelector((state) => state.services.doctor);
  const appointments = useSelector((state) => state.doctors.nearestAppointment);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setAppointments] = useState([]);
  const isServicesLoading = services.status === "loading";
  const isDoctorsLoading = doctors.status === "loading";
  const isAppointmentsLoading = appointments.status === "loading";

  React.useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setSelectedDoctor("");
    if (event.target.value) {
      dispatch(fetchDoctorsByService(event.target.value));
    }
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
    setAppointments("");
    if (event.target.value) {
      dispatch(fetchDoctorAppointments(event.target.value));
    }
  };

  const handleDateChange = (event) => {
    setAppointments(event.target.value);
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
                  <select
                    className="form__select-item"
                    value={selectedService}
                    onChange={handleServiceChange}
                  >
                    <option value="">Выберите услугу</option>
                    {(isServicesLoading
                      ? [...Array(3)]
                      : services.items || []
                    ).map((obj, index) =>
                      isServicesLoading ? (
                        <option key={`loading-services-${index}`}>Услгу нет</option>
                      ) : (
                        <option key={index} value={obj._id}>
                          {obj.service_name}
                        </option>
                      )
                    )}
                  </select>
                    
                  {selectedService && (
                    <select 
                      className='form__select-item' 
                      value={selectedDoctor} 
                      onChange={handleDoctorChange}
                    >
                      <option value="">Выберите врача</option>
                      {(isDoctorsLoading  ? [...Array(3)] : doctors || []).map((obj, index) => 
                      isDoctorsLoading  ? (
                        <option key={`loading-doctors-${index}`}>
                          Врачей нет
                        </option>
                      ) : (
                        <option key={index} value={obj._id}>
                        {obj.fullName}
                      </option>
                      ))}
                    </select>
                  )}
                  {selectedDoctor && (
                    <select
                      className="form__select-item"
                      value={selectedDate}
                      onChange={handleDateChange}
                    >
                      <option value="">Выберите дату</option>
                      {(isAppointmentsLoading
                        ? [...Array(3)]
                        : appointments.appointment_dates || []
                      ).map((obj, index) => (
                        isAppointmentsLoading ? (
                          <option key={`loading-appointments-${index}`}>Дат на запись нет</option>
                        ) : (
                          <option key={index} value={obj._id}>
                          {new Date(obj.start_date_time).toLocaleDateString()} {("0" + new Date(obj.start_date_time).getHours()).slice(-2)}:{("0" + new Date(obj.start_date_time).getMinutes()).slice(-2)}
                        </option>
                        )
                      ))}
                    </select>
                  )}
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
