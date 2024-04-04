const Services = ({title, img, service_num}) => {
    return ( 
        <div className="services__inner-item">
          <a className="services__inner-link" href="">
            <h3 className="services__item-title">{title}</h3>
            <div className="services__item-box">
              <span className="services__item-num">{service_num}</span>
              <img className="services__item-img" src={img} alt={img} />
            </div>
          </a>
      </div>
     );
}
 
export default Services;