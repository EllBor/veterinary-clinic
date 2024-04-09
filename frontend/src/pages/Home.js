import "../styles/style.css";  
import "../styles/flickity.css";

import clock from "../images/clock.svg";
import tel from "../images/tel.svg";
import map from "../images/map.svg";

import Services from "../components/services/Services";
import Reasons from "../components/reasons/Reasons";
import Flickity from "react-flickity-component";
import SpecialistsSlider from "../components/specialistsSlider/SpecialistsSlider";
import TopSlider from "../components/topSlider/TopSlider";

import { services } from "./../helpers/servicesList";
import { reasons } from "./../helpers/reasonsList";
import { specialistsList } from "./../helpers/specialistsList";
import { topSliderList } from "../helpers/topSliderList";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <main className="main">
      <section className="top">
        <div className="top__slider">
          <Flickity
            className="Slider"
            elementType="div"
            disableImagesLoaded="false"
            reloadOnUpdate
            static
            options={{
              prevNextButtons: false,
              autoPlay: true,
            }}
          >
            {topSliderList.map((project) => {
              return <TopSlider key={project.id} img={project.img} title={project.title} />;
            })}
          </Flickity>
        </div>
      </section>
      <section className="services">
        <div className="container">
          <div className="services__inner">
            {services.map((project) => {
              return (
                <Services
                  key={project.id}
                  title={project.title}
                  img={project.img}
                  service_num={project.service_num}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section className="information">
        <div className="container">
          <div className="information__inner">
            <div className="information__inner-history">
              <h2 className="history__title">История компании</h2>
              <p className="history__text">
                История компании начинается 14 января 1999 года, когда было
                образовано ООО «Чижи». Идея пришла, т.к. у основателя компании
                Прозор Жанны Георгиевны была собака боксёр по кличке Бард…
              </p>
              <NavLink className="history__link" to="/history">ЧИТАТЬ ДАЛЕЕ</NavLink>
            </div>
            <div className="specialists">
              <h2 className="specialists__title">Наши специалисты</h2>
              <div className="specialists__slider">
                <Flickity
                  className="Slider"
                  elementType="div"
                  disableImagesLoaded="false"
                  reloadOnUpdate
                  static
                  options={{
                    pageDots: false,
                    wrapAround: true,
                    freeScroll: true,
                  }}
                >
                  {specialistsList.map((project) => {
                    return (
                      <SpecialistsSlider key={project.id} img={project.img} />
                    );
                  })}
                </Flickity>
              </div>
              <NavLink className="specialists__slider-link" to="/collective">ПОСМОТРЕТЬ ВСЕХ</NavLink>
            </div>
          </div>
        </div>
      </section>
      <section className="quantity">
        <div className="container">
          <div className="quantity__inner">
            <h1 className="quantity__title">1 150 000</h1>
            <p className="quantity__text">
              питомцам мы помогли за 18 лет работы
            </p>
          </div>
        </div>
      </section>
      <section className="choice">
        <div className="container">
          <h2 className="choice__title">Почему хозяева выбирают нас?</h2>
          <div className="choice__grid">
            <ul className="choice__grid-list">
              {reasons.map((project) => {
                return (
                  <Reasons
                    key={project.id}
                    title={project.title}
                    img={project.img}
                    text={project.text}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </section>
      <section className="contacts" id="contacts-section">
        <div className="container">
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
        </div>
      </section>
    </main>
  );
};

export default Home;
