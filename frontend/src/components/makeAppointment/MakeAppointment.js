import React from "react";
import { useDispatch} from "react-redux";
import { fetchAppointmentDelete, fetchAppointment } from "../../redux/slices/appointment";

import doc_foto from "../../images/doc-foto.png";
import trash from "../../images/trash.svg";

const MakeAppointment = ({
  id,
  appointmentId,
  appointmentDate,
  appointmentTime,
  petName,
  doctor,
  clinicAddress,
  consultationLink
}) => {
  
  const dispatch = useDispatch();
  const onClickRemoveAppoimtment = async () => {
    if (
      window.confirm("Вы действительно хотетите отменить запись на приём?")
    ) {
      await dispatch(fetchAppointmentDelete({ userId: id, appointmentId: appointmentId }));
      await dispatch(fetchAppointment(id));
    }
  };

  return (
    <div className="note__card">
      <div className="note__card-foto card-foto">
        <img src={doc_foto} alt="" />
        <button className="info__card-text" onClick={onClickRemoveAppoimtment}>
          <img src={trash} alt=""></img>
        </button>
      </div>

      <div className="note__card-info">
        <h4 className="note__card-title">Врач</h4>
        <p>{doctor}</p>
        <h4 className="note__card-title">
          {clinicAddress ? "Адрес клиники: " : "Ссылка на онлайн-консультацию"}
        </h4>
        <p className="note__card-text">
          {clinicAddress ? (clinicAddress) : (consultationLink)}
        </p>
      </div>

      <div className="note__card-pet">
        <h4 className="note__pet-title">Питомец</h4>
        <p>{petName}</p>
        <h4 className="note__pet-title">Дата</h4>
        <p>{appointmentDate}</p>
        <h4 className="note__pet-title">Время</h4>
        <p>{appointmentTime}</p>
      </div>
    </div>
  );
};

export default MakeAppointment;
