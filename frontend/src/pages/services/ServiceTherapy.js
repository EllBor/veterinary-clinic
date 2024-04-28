import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import { useDispatch, useSelector } from "react-redux";

import Flickity from "react-flickity-component";
import { fetchDoctorsWithAppointments } from "../../redux/slices/doctors";
import { fetchOneService } from "../../redux/slices/services";
import DoctorSlider from "../../components/doctorSlider/DoctorSlider";
import { services as servicesList } from "../../helpers/servicesList";
import ServicesSlider from "../../components/servicesSlider/ServicesSlider";
import doc_foto from "../../images/doc-foto.png";
import therapy from "../../images/therapy-1.png";

import "../../styles/style-therapy.css";
import "../../styles/flickity.css";

const ServiceTherapy = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.doctorsWithAppointments);
  const services = useSelector((state) => state.services.diagnostics);
  const isServicesLoading = services.status === "loading";
  const isDoctorsLoading = doctors.status === "loading";

  React.useEffect(() => {
    dispatch(fetchDoctorsWithAppointments(id));
    dispatch(fetchOneService(id));
  }, [dispatch]);

  return (
    <main>
      <section className="service-therapy">
        <div className="container">
          <div className="service-therapy__inner">
            <nav className="service-therapy__nav">
              <h1 className="service-therapy__title">Терапия</h1>
              <ul className="service-therapy__nav-list">
                <li><NavLink className="service-therapy__item" to="/appointment">ЗАПИСАТЬСЯ НА ПРИЕМ</NavLink></li>
                <li><Link className="service-therapy__item" to="#price">ЦЕНЫ</Link></li>
              </ul>
            </nav>

            <div className="service-therapy__info">
              <NavLink className="appointment__back back" to="/">
                НАЗАД
              </NavLink>
              <div className="service-therapy__info-inner">
                <h2 className="service-therapy__info-title">
                  Записаться на прием к терапевту
                </h2>
                <div className="service-therapy__doc-slider">
                  {(isDoctorsLoading
                    ? Array.from({ length: 3 })
                    : doctors || []
                  ).map((obj, index) =>
                    isDoctorsLoading ? (
                      <DoctorSlider
                        key={`loading-doctor-${index}`}
                        isLoading={true}
                      />
                    ) : (
                      <DoctorSlider
                        key={obj._id}
                        avatarUrl={doc_foto}
                        fullName={obj.fullName}
                        closestAppointmentDate={obj.closestAppointmentDate}
                      />
                    )
                  )}
                </div>
                <div className="service-therapy__info-part">
                  <h2 className="service-therapy__part-title">
                    Терапия в нашей клинике
                  </h2>
                  <p className="service-therapy__part-text">
                    Терапия - область гуманной и ветеринарной медицины,
                    занимающаяся непосредственно лечением патологий, облегчением
                    состояния больного и устранением симптомов заболеваний.
                    Терапевтическое отделение клиники Айболит занимается
                    диагностикой и лечением следующих болезней:
                  </p>
                  <ul>
                    <li>Органов пищеварения;</li>
                    <li>Органов дыхательной системы;</li>
                    <li>Нервной системы;</li>
                    <li>Органов мочевыделительной системы;</li>
                    <li>Эндокринной системы;</li>
                    <li>Нарушения обмена веществ;</li>
                    <li>Кожи и ее производных;</li>
                    <li>Органов чувств;</li>
                    <li>Репродуктивной области;</li>
                    <li>Инфекционной и инвазионной природы;</li>
                    <li>Токсикологической природы.</li>
                  </ul>
                </div>

                <div className="service-therapy__info-part">
                  <h2 className="service-therapy__part-title">
                    Подзаголовок 1
                  </h2>
                  <p className="service-therapy__part-text">
                    В нашей клинике имеются как врачи-терапевты общей практики,
                    так и узкие специалисты по ряду перечисленных областей, что
                    дает возможность излечивать тяжелые и редкие случаи
                    патологий.
                  </p>
                  <img
                    className="service-therapy__part-img"
                    src={therapy}
                    alt={therapy}
                  />
                  <p className="service-therapy__part-text">
                    Врач-терапевт подходит к лечению животного комплексно,
                    предварительно изучив его анамнез, учитывая возраст, пол,
                    породу, наличие хронических болезней, условия содержания,
                    типа кормления, оценив общее состояние питомца, полностью
                    осмотрев его и назначив необходимую диагностику и
                    соответствующее лечение.
                  </p>
                  <p className="service-therapy__part-text">
                    Врачи клиники имеют широкий спектр диагностических
                    возможностей, что является идеальным условием для постановки
                    точного диагноза, а значит и назначения того лечения,
                    которое наиболее эффективно справится с данным конкретным
                    клиническим случаем.
                  </p>
                  <p className="service-therapy__part-text">
                    Некоторую диагностику можно провести тут же на месте в
                    течение буквально нескольких минут, что немаловажно для
                    экстренных случаев и значительно экономят время владельцам:
                  </p>
                  <ul>
                    <li>Гематологический и биохимический анализы крови;</li>
                    <li>Исследование Т4 и кортизол;</li>
                    <li>Анализ газов крови;</li>
                    <li>Рентген;</li>
                    <li>
                      Ультразвуковое исследование брюшной полости и сердца;
                    </li>
                    <li>Экспресс-анализы на основные вирусные заболевания.</li>
                  </ul>
                </div>

                <div className="service-therapy__info-part">
                  <h2 className="service-therapy__part-title">
                    Подзаголовок 2
                  </h2>
                  <p className="service-therapy__part-text">
                    Большинство исследований, требующих седации (эндоскопия,
                    МРТ, лапароскопия), так же доступны в течение суток. Более
                    сложные анализы, такие как бактериологический посев,
                    гормоны, гистологическое исследование мы направляем в
                    дистанционную лабораторию.
                  </p>
                  <p className="service-therapy__part-text">
                    Получив результаты исследований врач приступает к анализу
                    причин и механизмов развития болезни и назначает лечение.
                    Оно может быть медикаментозным (домашним или стационарным)
                    или оперативным (экстренным или плановым).
                  </p>
                  <p className="service-therapy__part-text">
                    Эффективность терапии в большой степени зависит и от
                    владельца животного, ведь именно ему необходимо будет
                    соблюдать предписания врача, вовремя давать препараты или
                    ставить уколы, следить за развитием динамики и симптомов,
                    чтобы вовремя оповестить врача о происходящих изменениях,
                    для своевременной коррекции лечения.
                  </p>
                </div>

                <div className="service-therapy__price" id="price">
                  <h2 className="service-therapy__price-title">Цена</h2>
                  <div className="service-therapy__price-text">
                    <h3 className="service-therapy__title-material">
                      Цены указаны без учета расходоных материалов{" "}
                    </h3>
                    <div className="service-therapy__price-list">
                      {isServicesLoading ? (
                        <p>Loading...</p>
                      ) : (
                        services.map((diagnostic, index) => (
                          <div
                            key={index}
                            className="service-therapy__price-item"
                          >
                            <p>{diagnostic.diagnostics_name}</p>
                            <span>{diagnostic.diagnostics_price} ₽</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="service-therapy__allservices">
          <h2 className="service-therapy__services-title">Все услуги</h2>
          <div className="service-therapy__allservices-slider">
            <div className="service-therapy__slider">
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
                {servicesList.map((project) => {
                  return (
                    <ServicesSlider
                      key={project.id}
                      title={project.title}
                      img={project.img}
                      service_num={project.service_num}
                    />
                  );
                })}
              </Flickity>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceTherapy;
