import { NavLink } from "react-router-dom";

const Services = ({slug, title, img, service_num}) => {
    return ( 
      <NavLink className="services__inner-link" to={`/service-therapy/${slug}`}>
        <div className="services__inner-item">
            <h3 className="services__item-title">{title}</h3>
            <div className="services__item-box">
              <span className="services__item-num">{service_num} услуг</span>
              <img className="services__item-img" src={`http://localhost:4444/${img}`} alt={img} />
            </div>
        </div>
      </NavLink>
     );
}
 
export default Services;