import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";


import { selectIsAuthId } from "../redux/slices/auth";
import { fetchUsers } from "../redux/slices/users";
import { fetchServices, fetchDoctorsByService, fetchOneService } from "../redux/slices/services";
import { fetchDoctorServiceAppointments } from "../redux/slices/doctors";
import {
  fetchAppointmentCreate
} from "../redux/slices/appointment";
import {fetchReceiptCreate} from "../redux/slices/receipt";
import { fetchPets } from "../redux/slices/pets";
import AppointmentModal  from "../components/modal/AppointmentModal";

import card_success from "../images/card-success.svg";
import card_mir from "../images/card-mir.svg";
import master_card from "../images/master-card.svg";
import visa from "../images/visa.svg";

const OrderServices = () => {
  const id = useSelector(selectIsAuthId);
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const users = useSelector((state) => state.users);
  const services = useSelector((state) => state.services);
  const doctors = useSelector((state) => state.services.doctor);
  const appointments = useSelector((state) => state.doctors.sortedAppointments);
  const diagnostics = useSelector((state) => state.services.diagnostics);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDiagnostics, setSelectedDiagnostics] = useState([]);
  const [selectedService, setSelectedService] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [appointment_date_time, setAppointments] = useState([]);
  const [selectedPet, setPet] = useState([]);
  const isServicesLoading = services.status === "loading";
  const isUsersLoading = users.status === "loading";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  React.useEffect(() => {
    dispatch(fetchUsers(id));
    dispatch(fetchPets(id));
    dispatch(fetchServices());
  }, [dispatch, id]);

  React.useEffect(() => {
    if (
      !isServicesLoading &&
      !isUsersLoading &&
      !isPetsLoading &&
      !isDoctorsLoading &&
      !isAppointmentsLoading
    ) {
      setIsLoading(false);
    }
  }, [
    isServicesLoading,
    isUsersLoading,
    isPetsLoading,
    isDoctorsLoading,
    isAppointmentsLoading,
  ]);

  const handleDiagnosticsChange = (event) => {
    setSelectedDiagnostics(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setSelectedDoctor("");
    setSelectedDiagnostics("");
    setAppointments("");
    if (event.target.value) {
      dispatch(fetchOneService(event.target.value));
      dispatch(fetchDoctorsByService(event.target.value));
    }
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
    setAppointments("");
    if (event.target.value) {
      dispatch(fetchDoctorServiceAppointments({serviceId: selectedService, id: event.target.value}));
    }
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value)
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
      const online_consultation_link = "";
      const type = "оффлайн";
      const clinic_address = selectedDistrict;
      const newData = {appointment_date_time, clinic_address, online_consultation_link, type, ...data};
      await dispatch(
        fetchAppointmentCreate({
          userId: id,
          doctorId: selectedDoctor,
          petId: selectedPet,
          params: newData,
        })
      );

      const doctorName = doctors.find((item) => item._id === selectedDoctor).fullName;
      const petName = pets.items.find((item) => item._id === selectedPet).name;
      const paymentMethod = "card";
      const userFullName = users.items[0].fullName;
      const [service, amount] = selectedDiagnostics.split(' ');
      console.log("service",service);
      const newReceipt = { service, amount, userFullName, clinic_address, doctorName, petName, paymentMethod }
        await dispatch(
          fetchReceiptCreate({
            userId: id,
            params: newReceipt
          })
      );
      openModal();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="appointment">
          <div className="container">
            <div className="appointment__inner order__inner">
              <h1 className="appointment__title">Оформление заказа</h1>
              <div className="order__box">
                <NavLink className="appointment__back back" to="/appointment">
                  НАЗАД
                </NavLink>
                <form
                  className="payment__form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form__select">

                  <select
                      className="form__select-item"
                      value={selectedDistrict}
                      onChange={handleDistrictChange}
                    >
                      <option value="">Выберите адресс клиники</option>
                          <option value="Дзержинский район, ул. Краснополянская, 30">
                            Дзержинский район, ул. Краснополянская, 30
                          </option>
                          <option value="Советский район, ул. Карла Маркса, 70">
                            Советский район, ул. Карла Маркса, 70
                          </option>
                    </select>


                    <select
                      className="form__select-item"
                      value={selectedService}
                      onChange={handleServiceChange}
                    >
                      <option value="">Выберите специализацию</option>
                      {(isServicesLoading
                        ? [...Array(3)]
                        : services.items || []
                      ).map((obj, index) =>
                        isServicesLoading ? (
                          <option key={`loading-services-${index}`}>
                            Данной специализации нет
                          </option>
                        ) : (
                          <option key={index} value={obj._id}>
                            {obj.service_name}
                          </option>
                        )
                      )}
                    </select>

                    <select
                      className="form__select-item"
                      value={selectedDiagnostics}
                      onChange={handleDiagnosticsChange}
                    >
                      <option value="">Выберите услугу</option>
                      {(isServicesLoading
                        ? [...Array(3)]
                        : diagnostics || []
                      ).map((obj, index) =>
                        isServicesLoading ? (
                          <option key={`loading-diagnostic-${index}`}>
                            Услгу нет
                          </option>
                        ) : (
                          <option key={index} value={`${obj.diagnostics_name} ${obj.diagnostics_price}`}>
                            {obj.diagnostics_name} {" "} {obj.diagnostics_price}
                          </option>
                        )
                      )}
                    </select>

                    {
                      <select
                        className="form__select-item"
                        value={selectedDoctor}
                        onChange={handleDoctorChange}
                      >
                        <option value="">Выберите врача</option>
                        {(isDoctorsLoading ? [...Array(3)] : doctors || []).map(
                          (obj, index) =>
                            isDoctorsLoading ? (
                              <option key={`loading-doctors-${index}`}>
                                Врачей нет
                              </option>
                            ) : (
                              <option key={index} value={obj._id}>
                                {obj.fullName}
                              </option>
                            )
                        )}
                      </select>
                    }

                    
                    {
                      <select
                        className="form__select-item"
                        value={appointment_date_time}
                        onChange={handleDateChange}
                      >
                        <option value="">Выберите дату</option>
                        {(isAppointmentsLoading
                          ? [...Array(3)]
                          : appointments || []
                        ).map((obj, index) =>
                          isAppointmentsLoading ? (
                            <option key={`loading-appointments-${index}`}>
                              Дат на запись нет
                            </option>
                          ) : (
                            <option key={index} value={new Date(obj.start_date_time).toString()}>
                              {new Date(
                                obj.start_date_time
                              ).toLocaleDateString()}{" "}
                              {(
                                "0" + new Date(obj.start_date_time).getHours()
                              ).slice(-2)}
                              :
                              {(
                                "0" + new Date(obj.start_date_time).getMinutes()
                              ).slice(-2)}
                            </option>
                          )
                        )}
                      </select>
                    }
                  </div>

                  <div className="personal">
                    <TextField
                      className="personal__input"
                      type="text"
                      label="ФИО"
                      value={
                        isUsersLoading
                          ? ""
                          : users.items && users.items.length > 0
                          ? users.items[0].fullName
                          : ""
                      }
                    />
                    {
                      <select
                        className="form__select-item"
                        value={selectedPet}
                        onChange={handlePateChange}
                      >
                        <option value="">Выберите питомца</option>
                        {(isPetsLoading ? [...Array(3)] : pets.items || []).map(
                          (obj, index) =>
                            isPetsLoading ? (
                              <option key={`loading-pets-${index}`}>
                                Питомцев нет
                              </option>
                            ) : (
                              <option key={index} value={obj._id}>
                                {obj.name}
                              </option>
                            )
                        )}
                      </select>
                    }

                    <TextField
                      className="personal__input"
                      type="text"
                      label="+79999999999"
                      value={
                        isUsersLoading
                          ? ""
                          : users.items && users.items.length > 0
                          ? users.items[0].phone
                          : ""
                      }
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
                    helperText={errors.problems ? errors.problems.message : ""}
                    multiline
                    rows={4}
                  />

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
                        <label
                          className="order__label order__label-number"
                          htmlFor="number"
                        >
                          Номер карты
                        </label>
                        <input
                          className="order__input"
                          type="number"
                          id="number"
                        />
                      </div>

                      <div className="order__input-owner">
                        <label
                          className="order__label order__label-owner"
                          htmlFor="owner"
                        >
                          Владелец карты
                        </label>
                        <input
                          className="order__input"
                          type="text"
                          id="owner"
                        />
                      </div>

                      <div className="order__input-date-cvv">
                        <label
                          className="order__label order__label-date"
                          htmlFor="date"
                        >
                          Дата истечения срока действия
                        </label>
                        <div className="order__date-wrapper">
                          <input
                            className="order__date-cvv "
                            type="text"
                            id="date1"
                          />
                        </div>
                        <input
                          className="order__date-cvv order__date"
                          type="text"
                          id="date"
                        />

                        <label
                          className="order__label order__label-cvv"
                          htmlFor="cvv2"
                        >
                          CVV2
                        </label>
                        <input
                          className="order__date-cvv"
                          type="text"
                          id="cvv2"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="top__slider-btn order-btn"
                    type="submit"
                    disabled={!isValid || loading}
                  >
                    ЗАПИСАТЬСЯ
                  </button>
                </form>
                <AppointmentModal isOpen={isModalOpen} onClose={closeModal} id = {id} />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default OrderServices;
