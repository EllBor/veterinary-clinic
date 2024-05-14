import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { fetchOnePet } from "../redux/slices/pets";
import { fetchMedicalHistory } from "../redux/slices/histories";
import PDFDocumentHistory from '../components/pdfDocument/PDFDocumentHistory';

const MedicalCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const userid = useSelector(selectIsAuthId);
  const pet = useSelector(state => state.pets.items);
  const history = useSelector(state => state.histories);
  const isPetsLoading = pet.status === "loading";
  const isHistoryLoading = history.status === "loading";

  React.useEffect(() => {
    dispatch(fetchOnePet(userid, id));
    dispatch(fetchMedicalHistory(id));
  }, [dispatch, userid, id]);

  return (
    <div>
      {isPetsLoading || isHistoryLoading ? (
        <div>Loading...</div>
      ) : !pet ? (
        <div>Pet not found.</div>
      ) : (
        <div className='medical-card'>
          <h1 className='medical-card__title'>Медицинская карта питомца: {pet.name}</h1>
          <div className='medical-card__base-info'>
            <h2 className='base-info__title'>Основная информация:</h2>
            <p className='base-info__text'>Вид: {pet.species}</p>
            <p className='base-info__text'>Порода: {pet.breed}</p>
            <p className='base-info__text'>Пол: {pet.gender}</p>
            <p className='base-info__text'>Возраст: {pet.age}</p>
          </div>
          <div className='medical-history'>
            <h2 className='medical-history__title'>Медицинская история:</h2>
            <p className='medical-history__text'>{history}</p>
          </div>
          <div className='medical-prescriptions'>
            <h2 className='medical-prescriptions__title'>Назначения:</h2>
            <ul className='medical-prescriptions__list'>
              {history.prescriptions.map((prescription, index) => (
                <li className='medical-prescriptions__list-item' key={index}>
                  <p className='list-item__text'>Лекарство: {prescription.medication}</p>
                  <p className='list-item__text'>Дозировка: {prescription.dosage}</p>
                  <p className='list-item__text'>Частота: {prescription.frequency}</p>
                  <p className='list-item__text'>Начальная дата: {prescription.startDate}</p>
                  <p className='list-item__text'>Конечная дата: {prescription.endDate}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <button
        variant="primary"
        onClick={() => setIsLoading(true)}
        disabled={isLoading}
      >
        {isLoading ? 'Создание PDF...' : 'Скачать PDF'}
      </button>
      {isLoading && (
        <PDFDownloadLink document={<PDFDocumentHistory pet={pet} history={history} />} fileName="medical_card.pdf">
          {({loading}) =>
            loading ? 'Загрузка PDF...' : 'Скачать PDF'
          }
        </PDFDownloadLink>
      )}
    </div>
  );
  
};

export default MedicalCard;
