import "../styles/style-collective.css";

import { NavLink } from "react-router-dom";

import collective_page from "../images/collective-page.png";
import doc_foto from "../images/doc-foto.png";

const Collective = () => {
  return (
    <main>
      <section className="collective">
        <div className="container">
          <div className="collective__inner">
            <h1 className="collective__title">Коллектив</h1>

            <div className="collective__about">
              <NavLink className="appointment__back back collective-back" to="/">
                НАЗАД
              </NavLink>
              <img
                className="collective__img"
                src={collective_page}
                alt=""
              />
              <div className="collective__part-about">
                <h3 className="collective__part-title">О нас</h3>
                <p className="collective__part-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>

              <div className="collective__specialists">
                <h3 className="collective__specialists-title">Специалисты</h3>
                <div className="collective__specialists-grid">
                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="specialists__item">
                    <a className="specialists__item-link" href="">
                      <div className="specialists__item-foto">
                        <img src={doc_foto} alt="" />
                        <p>стаж 10 лет</p>
                      </div>
                      <div className="specialists__item-info">
                        <h4>Врач</h4>
                        <p>Иванова Анастасия Андреевна</p>
                        <h4>Специализация</h4>
                        <p>
                          Терапия, УЗИ-диагностика, хирургия, ортопедия,
                          лаборатория
                        </p>
                      </div>
                    </a>
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

export default Collective;
