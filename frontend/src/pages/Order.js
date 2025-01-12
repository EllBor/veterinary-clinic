import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { selectIsAuthId } from "../redux/slices/auth";
import { fetchUsers } from "../redux/slices/users";
import { fetchServices, fetchDoctorsByService } from "../redux/slices/services";
import { fetchDoctorServiceAppointments, fetchUpdateAppointmentStatus} from "../redux/slices/doctors";
import {
  fetchAppointmentCreate
} from "../redux/slices/appointment";
import { fetchPets } from "../redux/slices/pets";
import AppointmentModal from "../components/modal/AppointmentModal";

import "../styles/style-adaptive.css";

const Order = () => {
  const id = useSelector(selectIsAuthId);
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const users = useSelector((state) => state.users);
  const services = useSelector((state) => state.services);
  const doctors = useSelector((state) => state.services.doctor);
  const appointments = useSelector((state) => state.doctors.sortedAppointments);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedService, setSelectedService] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState([]);
  const [appointment_date_time, setAppointments] = useState([]);
  const [selectedPet, setPet] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const newStatus = 'запланирован';
      const paramsDate = {appointment_date_time, newStatus};
      await dispatch(fetchUpdateAppointmentStatus({
        serviceId: selectedService, 
        doctorId: selectedDoctor,
        params: paramsDate,
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
    <main className="main">
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
                      <option value="">Выберите адрес клиники</option>
                          <option  value="Дзержинский район, ул. Краснополянская, 30">
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
                      <option value="">Выберите услугу</option>
                      {(isServicesLoading
                        ? [...Array(3)]
                        : services.items || []
                      ).map((obj, index) =>
                        isServicesLoading ? (
                          <option key={`loading-services-${index}`}>
                            Услгу нет
                          </option>
                        ) : (
                          <option key={index} value={obj._id}>
                            {obj.service_name}
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
                    {console.log("appointments",appointments)}
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

export default Order;
