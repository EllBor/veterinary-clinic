import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Flickity from "react-flickity-component";

import Services from "../components/services/Services";
import Reasons from "../components/reasons/Reasons";
import SpecialistsSlider from "../components/specialistsSlider/SpecialistsSlider";
import TopSlider from "../components/topSlider/TopSlider";
import Contacts from "../components/contacts/Contacts";
import {fetchServices} from "../redux/slices/services";

import { reasons } from "./../helpers/reasonsList";
import { specialistsList } from "./../helpers/specialistsList";
import { topSliderList } from "../helpers/topSliderList";

import "../styles/style.css";
import "../styles/flickity.css";

const Home = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const isServicesLoading = services.status === "loading";

  React.useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]); 

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
              return (
                <TopSlider
                  key={project.id}
                  img={project.img}
                  title={project.title}
                />
              );
            })}
          </Flickity>
        </div>
      </section>
      <section className="services">
        <div className="container">
          <div className="services__inner">
            {(isServicesLoading
              ? [...Array(3)]
              : services.items || []
            ).map((obj, index) =>
            isServicesLoading ? (
                <Services
                  key={`loading-services-${index}`}
                  isLoading={true}
                />
              ) : (
                <Services
                  key={obj._id}
                  id={obj._id}
                  title={obj.service_name}
                  img={obj.avatarUrl}
                  service_num={obj.number}
                />
              )
            )}
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
              <NavLink className="history__link" to="/history">
                ЧИТАТЬ ДАЛЕЕ
              </NavLink>
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
              <NavLink className="specialists__slider-link" to="/collective">
                ПОСМОТРЕТЬ ВСЕХ
              </NavLink>
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
          <Contacts />
        </div>
      </section>
    </main>
  );
};

export default Home;
