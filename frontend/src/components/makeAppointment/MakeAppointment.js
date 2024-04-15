import doc_foto from "../../images/doc-foto.png";
const MakeAppointment = ({appointment_date_time, doctor}) => {
    return ( 
        <div className="note__card">
        <div className="note__card-foto card-foto">
          <img src={doc_foto} alt="" />
          <a href="#" className="info__card-text">
            отменить прием
          </a>
        </div>

        <div className="note__card-info">
          <h4 className="note__card-title">Врач</h4>
          <p>{doctor}</p>
          <h4 className="note__card-title">
            Ссылка на онлайн-консультацию
          </h4>
          <a href="">https://zoom.us/</a>
        </div>

        <div className="note__card-pet">
          <h4 className="note__pet-title">Питомец</h4>
          <p>Имя питомца</p>
          <h4 className="note__pet-title">Дата</h4>
          <p>{appointment_date_time}</p>
          <h4 className="note__pet-title">Время</h4>
          <p>15:45</p>
        </div>
      </div>
     );
}
 
export default MakeAppointment;