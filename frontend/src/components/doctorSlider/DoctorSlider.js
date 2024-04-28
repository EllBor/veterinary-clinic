const DoctorSlider = ({avatarUrl, fullName, closestAppointmentDate}) => {
    return ( 
        <div className="service-therapy__doc-slider-item">
        <img
          className="service-therapy__img"
          src={avatarUrl}
          alt="аватар"
        />
        <div className="service-therapy__item-box">
          <p className="service-therapy__item-name">
            {fullName}
          </p>
          <p className="service-therapy__item-date">
            ближайшая дата приема: {closestAppointmentDate ? new Date(closestAppointmentDate).toLocaleDateString() : 'запись недоступна'}
          </p>
        </div>
      </div>
     );
}
 
export default DoctorSlider;