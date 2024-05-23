import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useParams, NavLink } from "react-router-dom";

import { fetchOnePet } from "../redux/slices/pets";
import { fetchMedicalHistory } from "../redux/slices/histories";
import { selectIsAuthId, fetchAuthMe } from "../redux/slices/auth";
import PDFDocumentHistory from "../components/pdfDocument/PDFDocumentHistory";

const MedicalCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(selectIsAuthId);
  const pet = useSelector((state) => state.pets.pets);
  const historyPrescriptions = useSelector((state) => state.histories.prescriptions);
  const historyDiagnosis = useSelector((state) => state.histories.diagnosis);
  const isPrescriptionsLoading = historyPrescriptions.status === "loading";

  React.useEffect(() => {
    dispatch(fetchOnePet({ userId: userId, petId: id }));
    dispatch(fetchMedicalHistory(id));
    dispatch(fetchAuthMe());
  }, [dispatch, userId, id]);

  return (
    <main className="main">
      <section className="account">
        <div className="container">
        <NavLink className="account__link" to={`/account/${userId}`}>В личный кабинет</NavLink>
          <div className="history-card">
            {pet && (
              <div className="base-info">
                  <h1 className="base-info__title">
                    Медицинская карта питомца <span className="base-info__name">{pet.items.name}</span>
                </h1>
                <div className="base-info__box">
                  <h2 className="box__title">Основная информация:</h2>
                  <p className="box__text">Вид: {pet.items.species}</p>
                  <p className="box__text">Порода: {pet.items.breed}</p>
                  <p className="box__text">Пол: {pet.items.gender}</p>
                  <p className="box__text">Возраст: {pet.items.age}</p>
                </div>
              </div>
            )}
            <div className="madical-box">
              <div className="medical-history">
                <h2 className="medical-history__title">Медицинская история:</h2>
                <p className='medical-history__text'>{historyDiagnosis}</p>
              </div>
              <div className="medical-prescriptions">
                <h2 className="medical-prescriptions__title">Назначения:</h2>
                <ul className="medical-prescriptions__list">
                  {isPrescriptionsLoading ? (
                    <p>Loading...</p>
                  ) : (
                    historyPrescriptions.map((prescription, index) => (
                      <li
                        className="medical-prescriptions__list-item"
                        key={index}
                      >
                        <p className="list-item__text">
                          Лекарство: {prescription.medication}
                        </p>
                        <p className="list-item__text">
                          Дозировка: {prescription.dosage}
                        </p>
                        <p className="list-item__text">
                          Частота: {prescription.frequency}
                        </p>
                        <p className="list-item__text">
                          Начальная дата: {new Date(prescription.startDate).toLocaleDateString()}
                        </p>
                        <p className="list-item__text">
                          Конечная дата: {new Date(prescription.endDate).toLocaleDateString()}
                        </p>
                        <p className="list-item__line"> -----------------------------------------------</p>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
          <button
            className="btn_download"
            variant="primary"
            onClick={() => setIsLoading(true)}
            disabled={isLoading}
          >
            {isLoading ? "Создание PDF..." : "Скачать PDF"}
          </button>
          {isLoading && (
            <PDFDownloadLink
              document={<PDFDocumentHistory pet={pet.items} historyPrescriptions={historyPrescriptions} historyDiagnosis={historyDiagnosis} />}
              fileName="medical_card.pdf"
            >
              {({ loading }) => (loading ? "Загрузка PDF..." : "Скачать PDF")}
            </PDFDownloadLink>
          )}
        </div>
      </section>
    </main>
  );
};

export default MedicalCard;
