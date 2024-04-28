import { NavLink } from "react-router-dom";

const Services = ({title, img, service_num}) => {
    return ( 
      <NavLink className="services__inner-link" to="/service-therapy">
        <div className="services__inner-item">
            <h3 className="services__item-title">{title}</h3>
            <div className="services__item-box">
              <span className="services__item-num">{service_num}</span>
              <img className="services__item-img" src={img} alt={img} />
            </div>
      </div>
      </NavLink>
     );
}
 
export default Services;