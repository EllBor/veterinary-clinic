import { NavLink } from "react-router-dom"
import doc_foto from "../../images/doc-foto.png";
const Doctors = ({specialization, fullName, experience, level_education }) => {
  return (
    <div className="specialists__item">
      <NavLink className="specialists__item-link" to="/specialist">
        <div className="specialists__item-foto">
          <img src={doc_foto} alt="" />
          <p>{experience}</p>
        </div>
        <div className="specialists__item-info">
          <h4>{level_education}</h4>
          <p>{fullName}</p>
          <h4>Специализация</h4>
          <p>{specialization}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default Doctors;
