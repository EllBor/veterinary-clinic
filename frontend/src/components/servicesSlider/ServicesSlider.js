const ServicesSlider = ({title, img, service_num}) => {
    return ( 
        <div className="service-therapy__slider-item">
        <a className="service-therapy__item-link" href="">
          <h3 className="service-therapy__item-title">{title}</h3>
          <img
            className="service-therapy__item-img"
            src={img}
            alt={img}
          />
          <span>{service_num}</span>
        </a>
      </div>
     );
}
 
export default ServicesSlider;