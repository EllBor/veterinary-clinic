import foto_doc_service from "../images/foto-doc-service.png";
import therapy from "../images/therapy.svg";
import therapy_1 from "../images/therapy-1.png";

const ServiceTherapy = () => {
  return (
    <main>
      <section className="service-therapy">
        <div className="container">
          <div className="service-therapy__inner">
            <nav className="service-therapy__nav">
              <h1 className="service-therapy__title">Терапия</h1>
              <ul className="service-therapy__nav-list">
                <li className="service-therapy__item">ЗАПИСАТЬСЯ НА ПРИЕМ</li>
                <li className="service-therapy__item">ЦЕНЫ</li>
              </ul>
            </nav>

            <div className="service-therapy__info">
              <a className="appointment__back back" href="#">
                НАЗАД
              </a>
              <div className="service-therapy__info-inner">
                <h2 className="service-therapy__info-title">
                  Записаться на прием к терапевту
                </h2>
                <div className="service-therapy__slider">
                  <div className="service-therapy__slider-item">
                    <img
                      className="service-therapy__img"
                      src={foto_doc_service}
                      alt=""
                    />
                    <div className="service-therapy__item-box">
                      <p className="service-therapy__item-name">
                        Ивантелеев Иван Константинович
                      </p>
                      <p className="service-therapy__item-date">
                        ближайшая дата приема: 29.08.19
                      </p>
                    </div>
                  </div>
                  {/* <!-- <div className="service-therapy__slider-item">
                                <img  src={foto_doc_service}alt="">
                                <div className="service-therapy__item-box">
                                    <p className="service-therapy__item-name">
                                        Ивантелеев
                                        Иван Константинович
                                    </p>
                                    <p className="service-therapy__item-date">
                                        ближайшая дата приема:
                                        29.08.19
                                    </p>
                                </div>
                            </div>

                            <div className="service-therapy__slider-item">
                                <img src={foto_doc_service} alt=""/>
                                <div className="service-therapy__item-box">
                                    <p className="service-therapy__item-name">
                                        Ивантелеев
                                        Иван Константинович
                                    </p>
                                    <p className="service-therapy__item-date">
                                        ближайшая дата приема:
                                        29.08.19
                                    </p>
                                </div>
                            </div> --> */}
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
                    <li>органов пищеварения;</li>
                    <li>органов дыхательной системы;</li>
                    <li>нервной системы;</li>
                    <li>органов мочевыделительной системы;</li>
                    <li>эндокринной системы;</li>
                    <li>нарушения обмена веществ;</li>
                    <li>кожи и ее производных;</li>
                    <li>органов чувств;</li>
                    <li>репродуктивной области;</li>
                    <li>инфекционной и инвазионной природы;</li>
                    <li>токсикологической природы.</li>
                  </ul>
                </div>

                <div className="service-therapy__info-part">
                  <h2 className="service-therapy__part-title">Подзаголовок 1</h2>
                  <p className="service-therapy__part-text">
                    В нашей клинике имеются как врачи-терапевты общей практики,
                    так и узкие специалисты по ряду перечисленных областей, что
                    дает возможность излечивать тяжелые и редкие случаи
                    патологий.
                  </p>
                  <img
                    className="service-therapy__part-img"
                    src={therapy_1}
                    alt=""
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
                    <li>гематологический и биохимический анализы крови;</li>
                    <li>исследование Т4 и кортизол;</li>
                    <li>анализ газов крови;</li>
                    <li>рентген;</li>
                    <li>
                      ультразвуковое исследование брюшной полости и сердца;
                    </li>
                    <li>экспресс-анализы на основные вирусные заболевания.</li>
                  </ul>
                </div>

                <div className="service-therapy__info-part">
                  <h2 className="service-therapy__part-title">Подзаголовок 2</h2>
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

                <div className="service-therapy__price">
                  <h2 className="service-therapy__price-title">Цена</h2>
                  <p className="service-therapy__price-text">
                    Цены указаны без учета расходоных материалов
                    <div className="service-therapy__price-list">
                      <div className="service-therapy__price-item">
                        <p>Прием</p>
                        <span>320 ₽</span>
                      </div>

                      <div className="service-therapy__price-item">
                        <p>Прием повторный</p>
                        <span>220 ₽</span>
                      </div>

                      <div className="service-therapy__price-item">
                        <p>Консультация без осмотра животного</p>
                        <span>350 ₽</span>
                      </div>

                      <div className="service-therapy__price-item">
                        <p>Вызов врача на дом</p>
                        <span>1000 ₽</span>
                      </div>

                      <div className="service-therapy__price-item">
                        <p>Консультация по медицинским документам</p>
                        <span>500 ₽</span>
                      </div>

                      <div className="service-therapy__price-item">
                        <p>Полная выписка из истории болезни</p>
                        <span>500 ₽</span>
                      </div>

                      <div className="service-therapy__price-item">
                        <p>Прием</p>
                        <span>320 ₽</span>
                      </div>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="service-therapy__allservices">
          <h2 className="service-therapy__services-title">Все услуги</h2>
          <div className="service-therapy__allservices-slider">
            <div className="service-therapy__allservices-item service-therapy__all">
              <a className="service-therapy__item-link" href="">
                <h3 className="service-therapy__item-title">Терапия</h3>
                <img
                  className="service-therapy__item-img"
                  src={therapy}
                  alt=""
                />
                <span>26 услуг</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceTherapy;
