import pet_foto from "../../images/pet-foto.png";
import pdf from "../../images/pdf.png";
import trash from "../../images/trash.svg";
import update from "../../images/update.svg";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPetsDelete, fetchPets } from "../../redux/slices/pets";
import PetUpdateModal from "../modal/PetUpdateModal";

const Pets = ({
  userId,
  petId,
  name,
  breed,
  gender,
  species,
  age,
  avatarUrl,
}) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onClickRemovePets = async () => {
    if (
      window.confirm("Вы действительно хотетите удалить информацию о питомце?")
    ) {
      await dispatch(fetchPetsDelete({ userId: userId, petId: petId }));
      await dispatch(fetchPets(userId));
    }
  };

  return (
    <div className="info__card-pet">
      <div className="info__card-foto card-foto">
        <img src={pet_foto} alt="" />
      </div>

      <div className="info__card-info">
        <h3 className="info__card-main">{name}</h3>
        <h4 className="info__card-title">Тип</h4>
        <p>{species}</p>
        <h4 className="info__card-title">Пол</h4>
        <p>{gender}</p>
        <h4 className="info__card-title">Порода</h4>
        <p>{breed}</p>
        <h4 className="info__card-title">Возраст</h4>
        <p>{age}</p>
      </div>

      <div className="info__card-health">
        <h4 className="info__medical-title">Медицинская карта</h4>
        <div className="medical-card">
          <a className="medical-card__file" href="">
            <img src={pdf} alt="" />
            1025
          </a>
          <span className="medical-card__date">обновлена 25.06.23</span>
        </div>
        <h4 className="info__analyzes-title">Результаты анализов</h4>
        <div className="analyzes__box">
          <div className="analyzes__list-item">
            <a className="analyzes__item-file" href="">
              <img src={pdf} alt="" />
              ОАК
            </a>
            <span className="analyzes-card__date">25.06.23</span>
          </div>
          <div className="analyzes__list-item">
            <a className="analyzes__item-file" href="">
              <img src={pdf} alt="" />
              Узи брюшной полости
            </a>
            <span className="analyzes-card__date">25.06.23</span>
          </div>
          <div className="analyzes__list-item">
            <a className="analyzes__item-file" href="">
              <img src={pdf} alt="" />
              Биохимия крови
            </a>
            <span className="analyzes-card__date">25.06.23</span>
          </div>
        </div>
      </div>
      <div className="info__buttons">
        <button className="info__btn" onClick={openModal}>
          <img src={update} alt=""></img>
        </button>
        <PetUpdateModal
          isOpen={isModalOpen}
          onClose={closeModal}
          id={userId}
          petId={petId}
          name={name}
          breed={breed}
          gender={gender}
          species={species}
          age={age}
          avatarUrl={avatarUrl}
        />
        <button className="info__btn" onClick={onClickRemovePets}>
          <img src={trash} alt=""></img>
        </button>
      </div>
    </div>
  );
};

export default Pets;
