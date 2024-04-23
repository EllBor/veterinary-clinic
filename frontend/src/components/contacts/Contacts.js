import clock from "../../images/clock.svg";
import tel from "../../images/tel.svg";
import map from "../../images/map.svg";

const Contacts = () => {
    return ( 
        <div className="contacts__all">
        <div className="contacts__address">
          <h2 className="contacts__title">КОНТАКТЫ</h2>
          <div className="contacts__address-1 contacts__address">
            <h3 className="address-1__title address__title">
              Зоодоктор на Краснополянской
            </h3>
            <ul className="contacts__list">
              <li className="contacts__list-item">
                <a className="contacts__item-link" href="#">
                  <img className="contacts__item-img" src={map} alt="" />
                  <p className="contacts__item-text">
                    Дзержинский район, ул. Краснополянская, 30
                  </p>
                </a>
              </li>
              <li className="contacts__list-item">
                <a className="contacts__item-link" href="tel:962292">
                  <img className="contacts__item-img" src={tel} alt="" />
                  <p className="contacts__item-text">96 22 92</p>
                </a>
              </li>
              <li className="contacts__list-item">
                <a className="contacts__item-link" href="#">
                  <img className="contacts__item-img" src={clock} alt="" />
                  <p className="contacts__item-text">Круглосуточно</p>
                </a>
              </li>
            </ul>
          </div>
          <div className="contacts__address-2 contacts__address">
            <h3 className="address-2__title address__title">
              Зоодоктор на Тулака
            </h3>
            <ul className="contacts__list">
              <li className="contacts__list-item">
                <a className="contacts__item-link" href="#">
                  <img className="contacts__item-img" src={map} alt="" />
                  <p className="contacts__item-text">
                    Советский район, ул. Карла Маркса, 70
                  </p>
                </a>
              </li>
              <li className="contacts__list-item">
                <a className="contacts__item-link" href="tel:962292">
                  <img className="contacts__item-img" src={tel} alt="" />
                  <p className="contacts__item-text">96 22 92</p>
                </a>
              </li>
              <li className="contacts__list-item">
                <a className="contacts__item-link" href="#">
                  <img className="contacts__item-img" src={clock} alt="" />
                  <p className="contacts__item-text">Круглосуточно</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="contacts__map">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A3072b38d362fbbd827800ea1df8824f6759b1bf7e34ff6a8d1be4490effa7236&amp;source=constructor"
            width="800"
            height="530"
            frameborder="0"
          ></iframe>
        </div>
      </div>
     );
}
 
export default Contacts;