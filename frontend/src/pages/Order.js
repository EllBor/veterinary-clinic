import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import {selectIsAuthId} from "../redux/slices/auth";
import {fetchUsers} from "../redux/slices/users";
import { fetchServices, fetchDoctorsByService } from "../redux/slices/services";
import { fetchDoctorAppointments } from "../redux/slices/doctors";
import { fetchAppointmentCreate, fetchAppointment }  from "../redux/slices/appointment";
import {fetchPets} from "../redux/slices/pets";

const Order = () => {
  const id = useSelector(selectIsAuthId);
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const users = useSelector((state) => state.users);
  const services = useSelector((state) => state.services);
  const doctors = useSelector((state) => state.services.doctor);
  const appointments = useSelector((state) => state.doctors.nearestAppointment);
  const [selectedService, setSelectedService] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [selectedDate, setAppointments] = useState([]);
  const [selectedPet, setPet] = useState([]);
  const [loading, setLoading] = useState(false);
  const isServicesLoading = services.status === "loading";
  const isPetsLoading = pets.status === "loading";
  const isDoctorsLoading = doctors.status === "loading";
  const isAppointmentsLoading = appointments.status === "loading";
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  React.useEffect(() => {
    dispatch(fetchUsers(id));
    dispatch(fetchPets(id));
    dispatch(fetchServices());
  }, [dispatch, id]);

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

  const handlePateChange = (event) => {
    setPet(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      await dispatch(fetchAppointmentCreate({ userId: id, doctorId: selectedDoctor, petId: selectedPet, params: data }));
      dispatch(fetchAppointment(id));
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setLoading(false);
    }
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
              <form className="payment__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__select">
                  <select
                    className="form__select-item"
                    // value={selectedService}
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
                      // value={selectedDoctor} 
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
                  <TextField
                    className="personal__input"
                    type="text"
                    label="ФИО"
                    defaultValue={users.fullName}
                    // {...register("users.fullName", { required: "Укажите ФИО" })}
                    // error={Boolean(errors.users.fullName)}
                    // helperText={errors.users.fullName ? errors.users.fullName.message : ""}
                  />

                  {users.fullName && (
                    <select
                      className="form__select-item"
                      value={selectedPet}
                      onChange={handlePateChange}
                    >
                    <option value="">Выберите питомца</option>
                      {(isPetsLoading
                        ? [...Array(3)]
                        : pets.items || []
                      ).map((obj, index) => (
                        isPetsLoading ? (
                          <option key={`loading-pets-${index}`}>Питомцев нет</option>
                        ) : (
                          <option key={index} value={obj._id}>
                          {obj.name}
                        </option>
                        )
                      ))}
                    </select>
                  )}

                  <TextField
                    className="personal__input"
                    type="text"
                    label="+79999999999"
                    defaultValue={users.phone}
                    // {...register("users.phone", { required: "Укажите номер телефона" })}
                    // error={Boolean(errors.users.phone)}
                    // helperText={errors.users.phone ? errors.users.phone.message : ""}
                  />
                </div>

                <TextField
                  className="order-area"
                  type="text"
                  label="Кратко опишите проблему"
                  {...register("problems", {
                    required: "Кратко опишите проблему",
                  })}
                  error={Boolean(errors.problems)}
                  helperText={errors.problems? errors.problems.message : ""}
                />
    
              </form>
              <button 
              className="top__slider-btn order-btn"
              type="submit" 
              disabled={!isValid || loading}
              >
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
