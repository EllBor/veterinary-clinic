import { NavLink } from "react-router-dom";

import "../styles/style-specialist.css";
import "../styles/flickity.css";

import account_doc from "../images/account-doc.png";
import feedback_foto from "../images/feedback-foto.svg";

import Flickity from "react-flickity-component";
import { coursesList } from "../helpers/coursesList";
import Courses from "../components/courses/Courses";
import React, { useState } from 'react';
import FeedbackModel from '../components/modal/FeedbackModel';

const Specialist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <main>
      <section className="account-specialist">
        <div className="container">
          <div className="account-specialist__inner">
            <div className="account-specialist__foto">
              <img src={account_doc} alt="" />
              <p className="account-specialist__time">
                ближайшая дата приема: 29.08.19
              </p>
              <a className="account-specialist__btn" href="">
                ЗАПИСАТЬСЯ
              </a>
              <button className="account-specialist__feedback" onClick={openModal}>
                ОСТАВИТЬ ОТЗЫВ
              </button>
              <FeedbackModel isOpen={isModalOpen} onClose={closeModal} />
            </div>

            <div className="account-specialist__part-main">
              <NavLink className="appointment__back back" to="/collective">
                НАЗАД
              </NavLink>
              <div className="part-main__info-doc">
                <h3 className="part-main__title">Иванова Анастасия Андреевна</h3>
                <span className="part-main__experience">стаж 10 лет</span>
              </div>
              <p className="part-main__specialization">
                Терапия, УЗИ-диагностика, хирургия, ортопедия
              </p>
              <p className="part-main__text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur
              </p>
              <h4 className="part-main__courses-title">Пройденные курсы</h4>
              <div className="courses__slider">
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
                {coursesList.map((project) => {
                  return <Courses key={project.id} title={project.title} date={project.date}  />;
                })}
                </Flickity>
              </div>
              <div className="account-specialist__feedback-box">
                <div className="feedback-box">
                  <h3 className="feedback-box__title">Отзывы</h3>
                  <span className="feedback-box__number">101 отзыв</span>
                </div>

                <div className="feedback__card-item">
                  <div className="feedback__card-foto">
                    <img src={feedback_foto} alt="" />
                  </div>
                  <div className="feedback__card-main">
                    <h4 className="feedback__main-title">Пользоваель</h4>
                    <p className="feedback__main-name">Виктория</p>
                    <h4 className="feedback__main-title">Отзыв</h4>
                    <p className="feedback__main-comments">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum, Lorem ip
                    </p>
                  </div>
                </div>

                <div className="feedback__card-item">
                  <div className="feedback__card-foto">
                    <img src={feedback_foto} alt="" />
                  </div>
                  <div className="feedback__card-main">
                    <h4 className="feedback__main-title">Пользоваель</h4>
                    <p className="feedback__main-name">Виктория</p>
                    <h4 className="feedback__main-title">Отзыв</h4>
                    <p className="feedback__main-comments">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum, Lorem ip
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Specialist;