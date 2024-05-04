import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/account.css";

import pdf from "../images/pdf.png";

import Pets from "../components/pets/Pets";
import { fetchPets } from "../redux/slices/pets";
import { fetchUsers } from "../redux/slices/users";
import { fetchAppointment } from "../redux/slices/appointment";
import {selectIsAuthId} from "../redux/slices/auth";

import UserCard from "../components/userCard/UserCard";
import NavAccount from "../components/navAccount/navAccount";
import PetCreateModal from "../components/modal/PetCreateModal";
import MakeAppointment from "../components/makeAppointment/MakeAppointment";

const Account = () => {
  const id = useSelector(selectIsAuthId);
  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets);
  const users = useSelector((state) => state.users);
  const appointment = useSelector((state) => state.appointment);
  const isUsersLoading = users.status === "loading";
  const isPetsLoading = pets.status === "loading";
  const isAppointmentLoading = appointment.status === "loading";

  React.useEffect(() => {
    dispatch(fetchUsers(id));
    dispatch(fetchPets(id));
    dispatch(fetchAppointment(id));
  }, [dispatch, id]); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      <section className="account">
        <div className="container">
          <div className="account__top">
            {(isUsersLoading ? [...Array(3)] : users.items || []).map(
              (obj, index) =>
                isUsersLoading ? (
                  <NavAccount key={`loading-NavAccount-${index}`} isLoading={true} />
                ) : (
                  <NavAccount key={obj._id} fullName={obj.fullName} id={obj._id} />
                )
            )}
            {(isUsersLoading ? [...Array(3)] : users.items || []).map(
              (obj, index) =>
                isUsersLoading ? (
                  <UserCard key={`loading-usercard-${index}`} isLoading={true} />
                ) : (
                  <UserCard
                    key={obj._id}
                    id={id}
                    phone={obj.phone}
                    fullName={obj.fullName}
                    aboutUser={obj.aboutUser}
                    avatarUrl={obj.avatarUrl}
                  />
                )
            )}
          </div>
          <div className="account__bottom">
            <div className="account__cheque">
              <h2 className="cheque__title">Прошлые заказы</h2>
              <div className="cheque__box">
                <div className="cheque__list-item">
                  <h3 className="cheque__item-title">
                    Чек об оплате от <span>15.06.23 </span>
                  </h3>
                  <a className="cheque__item-file" href="">
                    <img src={pdf} alt="" />
                    00098873774772
                  </a>
                </div>
                <div className="cheque__list-item">
                  <h3 className="cheque__item-title">
                    Чек об оплате от <span>15.06.23</span>
                  </h3>

                  <a className="cheque__item-file" href="">
                    <img src={pdf} alt="" />
                    00098873774772
                  </a>
                </div>
                <div className="cheque__list-item">
                  <h3 className="cheque__item-title">
                    Чек об оплате от <span>15.06.23 </span>
                  </h3>
                  <a className="cheque__item-file" href="">
                    <img src={pdf} alt="" />
                    00098873774772
                  </a>
                </div>
              </div>
            </div>

            <div className="account__info">
              <h2 className="info__title">Мои питомцы</h2>
              <div className="info__box">
                <button className="info__btn-add" onClick={openModal}>
                  ДОБАВИТЬ НОВОГО ПИТОМЦА
                </button>
                <PetCreateModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  id={id}
                />
                <div className="account-container">
                {(isPetsLoading ? [...Array(3)] : pets.items || []).map(
                  (obj, index) =>
                    isPetsLoading ? (
                      <Pets key={`loading-pet-${index}`} isLoading={true} />
                    ) : (
                      <Pets
                        key={obj._id}
                        userId={id}
                        petId={obj._id}
                        name={obj.name}
                        breed={obj.breed}
                        gender={obj.gender}
                        species={obj.species}
                        age={obj.age}
                        avatarUrl={obj.avatarUrl}
                      />
                    )
                )}
                </div>
              </div>

              <div className="account__note">
                <h2 className="note__title">Запись на прием</h2>
                <div className="account-container">
                  {(isAppointmentLoading
                    ? [...Array(3)]
                    : appointment.items || []
                  ).map((obj, index) =>
                    isAppointmentLoading ? (
                      <MakeAppointment  key={`loading-appointment-${index}`} isLoading={true} />
                    ) : (
                      <MakeAppointment
                        key={obj._id}
                        id={id}
                        appointmentId={obj.appointmentId}
                        appointmentDate={new Date(obj.appointmentDateTime).toLocaleDateString()}
                        appointmentTime={new Date(obj.appointmentDateTime).toLocaleTimeString()}
                        petName={obj.petName}
                        doctor={obj.doctor}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Account;
