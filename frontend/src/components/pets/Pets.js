import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchPetsDelete, fetchPets } from "../../redux/slices/pets";
import PetUpdateModal from "../modal/PetUpdateModal";
import { fetchMedicalHistory, fetchAnalysisResults } from "../../redux/slices/histories";
import Analyzes from "../analyzes/Analyzes";

import foto from "../../images/account-foto.png";
import pdf from "../../images/pdf.png";
import trash from "../../images/trash.svg";
import update from "../../images/update.svg";

const Pets = ({
  userId,
  petId,
  slug,
  name,
  breed,
  gender,
  species,
  age,
  avatarUrl,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const medicalCardNumber = useSelector(
    (state) => state.histories.medicalCardNumber
  );
  const analyzes = useSelector((state) => state.histories);
  const isAnalyzesLoading = analyzes.status === "loading";
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  React.useEffect(() => {
    dispatch(fetchMedicalHistory(petId));
    dispatch(fetchAnalysisResults(petId));
  }, [dispatch, petId]);

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
        <img
          className="info__card-img"
          src={avatarUrl ? `http://localhost:4444${avatarUrl}` : foto}
          alt="avatar"
        />
        <button className="info__btn" onClick={onClickRemovePets}>
          <img src={trash} alt=""></img>
        </button>
        <button className="info__btn" onClick={openModal}>
          <img src={update} alt="update"></img>
        </button>
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
          <div className="medical-card">
          <NavLink className="medical-card__file" to={`/medical-card/${slug}`}>
            <h4 className="info__medical-title">Медицинская карта</h4>
            <img src={pdf} alt="medical card" />
            {medicalCardNumber}
            <span className="medical-card__date">обновлена</span>
            </NavLink>
          </div>


        <div className="analyzes__box">
        <h4 className="info__analyzes-title">Результаты анализов</h4>
          {(isAnalyzesLoading ? [...Array(3)] : analyzes.items || []).map(
            (obj, index) =>
              isAnalyzesLoading ? (
                <Analyzes key={`loading-analyzes-${index}`} isLoading={true} />
              ) : (
                <Analyzes
                  key={obj._id}
                  petId={petId}
                  resultDate={new Date(obj.date).toLocaleDateString()}
                  analysisName={obj.analysisName}
                />
              )
          )}
        </div>
      </div>
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
    </div>
  );
};

export default Pets;
