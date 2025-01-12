import React, { useState } from "react";

import foto from "../../images/account-foto.png";
import update from "../../images/update.svg";
import UserUpdateModal from "../modal/UserUpdateModal";

const UserCard = ({ id, phone, fullName, aboutUser, avatarUrl }) => {
  const safeFullName = fullName || "";
  const parts = safeFullName.split(" ");
  const name = parts[1];
  const surname = parts[0];
  const patronymic = parts[2];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="account__personal">
      <div className="personal__card">
        <div className="personal__card-foto card-foto">
          <img className="personal__card-img" src={avatarUrl ? `http://localhost:4444${avatarUrl}` : foto} alt="" />
          <button className="info__btn" onClick={openModal}>
            <img src={update} alt=""></img>
          </button>
          <UserUpdateModal
            isOpen={isModalOpen}
            onClose={closeModal}
            id={id}
            phone={phone}
            name={name}
            surname={surname}
            patronymic={patronymic}
            aboutUser={aboutUser}
            avatarUrll={avatarUrl}
          />
        </div>
        <div className="personal__card-info">
          <h4 className="personal__card-title">Имя</h4>
          <p>{name}</p>
          <h4 className="personal__card-title">Фамилия</h4>
          <p>{surname}</p>
          <h4 className="personal__card-title">Отчество</h4>
          <p>{patronymic}</p>
          <h4 className="personal__card-title">Телефон</h4>
          <p>{phone}</p>
        </div>

        <div className="personal__card-aboutme">
          <h4 className="personal__card-title">О себе</h4>
          <p className="personal__aboutme-text">{aboutUser}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
