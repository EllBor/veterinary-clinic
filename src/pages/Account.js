import "../styles/account.css";

import pdf from "../images/pdf.png";
import account_foto from "../images/account-foto.png";
import pet_foto from "../images/pet-foto.png";
import doc_foto from "../images/doc-foto.png";

const Account = () => {
  return (
    <main>
      <section className="account">
        <div className="container">
          <div className="account__top">
            <nav className="account__nav">
              <h1 className="account__title">Виктория</h1>
              <ul className="account__nav-list">
                <li className="account__list-item">
                  <a className="account__item-link" href="#">
                    ЛИЧНЫЕ ДАННЫЕ
                  </a>
                </li>
                <li className="account__list-item">
                  <a className="account__item-link" href="#">
                    МОИ ПИТОМЦЫ
                  </a>
                </li>
                <li className="account__list-item">
                  <a className="account__item-link" href="#">
                    ЗАПИСЬ НА ПРИЕМ
                  </a>
                </li>
                <li className="account__list-item">
                  <a className="account__item-link" href="#">
                    ВЫЙТИ
                  </a>
                </li>
                <li className="account__list-item">
                  <a className="account__item-link" href="#">
                    УДАЛИТЬ АККАУНТ
                  </a>
                </li>
              </ul>
            </nav>

            <div className="account__personal">
              <div className="personal__card">
                <div className="personal__card-foto card-foto">
                  <img src={account_foto} alt="" />
                  <a href="#" className="personal__card-text">
                    изменить
                  </a>
                </div>

                <div className="personal__card-info">
                  <h4 className="personal__card-title">Имя</h4>
                  <p>Виктория</p>
                  <h4 className="personal__card-title">Фамилия</h4>
                  <p>Иванова</p>
                  <h4 className="personal__card-title">Отчетсво</h4>
                  <p>Александровна</p>
                  <h4 className="personal__card-title">Телефон</h4>
                  <p>+7 999 598-12-45</p>
                </div>

                <div className="personal__card-aboutme">
                  <h4 className="personal__card-title">О себе</h4>
                  <p className="personal__aboutme-text">
                    Живу в Волгограде, очень люблю животных! Мечтаю завести
                    много зверей и построить приют. Пока что у меня собака,
                    кошка и рыбки :)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="account__bottom">
            <div className="account__cheque">
              <h2 className="cheque__title">Прошлые заказы</h2>
              <div className="cheque__box">
                <div className="cheque__list-item">
                  <h3 className="cheque__item-title">
                    Чек об оплате от <span>15.06.23 </span>
                  </h3>
                  <a className="cheque__item-file" href="">
                    <img src={pdf} alt="" />
                    00098873774772
                  </a>
                </div>
                <div className="cheque__list-item">
                  <h3 className="cheque__item-title">
                    Чек об оплате от <span>15.06.23 </span>
                  </h3>
                  <a className="cheque__item-file" href="">
                    <img src={pdf} alt="" />
                    00098873774772
                  </a>
                </div>
                <div className="cheque__list-item">
                  <h3 className="cheque__item-title">
                    Чек об оплате от <span>15.06.23 </span>
                  </h3>
                  <a className="cheque__item-file" href="">
                    <img src={pdf} alt="" />
                    00098873774772
                  </a>
                </div>
              </div>
            </div>

            <div className="account__info">
              <h2 className="info__title">Мои питомцы</h2>
              <div className="info__box">
                <button className="info__btn-add">ДОБАВИТЬ НОВОГО ПИТОМЦА</button>

                <div className="info__card-pet">
                  <div className="info__card-foto card-foto">
                    <img src={pet_foto} alt="" />
                    <a href="#" className="info__card-text">
                      изменить
                    </a>
                  </div>

                  <div className="info__card-info">
                    <h3 className="info__card-main">Имя питомца</h3>
                    <h4 className="info__card-title">Тип</h4>
                    <p>Собака</p>
                    <h4 className="info__card-title">Пол</h4>
                    <p>Мужской</p>
                    <h4 className="info__card-title">Порода</h4>
                    <p>Без породы</p>
                    <h4 className="info__card-title">Возраст</h4>
                    <p>1 год 2 месяца</p>
                  </div>

                  <div className="info__card-health">
                    <h4 className="info__medical-title">Медицинская карта</h4>
                    <div className="medical-card">
                      <a className="medical-card__file" href="">
                        <img src={pdf} alt="" />
                        1025
                      </a>
                      <span className="medical-card__date">обновлена 25.06.23</span>
                    </div>
                    <h4 className="info__analyzes-title">Результаты анализов</h4>
                    <div className="analyzes__box">
                      <div className="analyzes__list-item">
                        <a className="analyzes__item-file" href="">
                          <img src={pdf} alt="" />
                          ОАК
                        </a>
                        <span className="analyzes-card__date">25.06.23</span>
                      </div>
                      <div className="analyzes__list-item">
                        <a className="analyzes__item-file" href="">
                          <img src={pdf} alt="" />
                          Узи брюшной полости
                        </a>
                        <span className="analyzes-card__date">25.06.23</span>
                      </div>
                      <div className="analyzes__list-item">
                        <a className="analyzes__item-file" href="">
                          <img src={pdf} alt="" />
                          Биохимия крови
                        </a>
                        <span className="analyzes-card__date">25.06.23</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="account__note">
                <h2 className="note__title">Запись на прием</h2>
                <div className="note__card">
                  <div className="note__card-foto card-foto">
                    <img src={doc_foto} alt="" />
                    <a href="#" className="info__card-text">
                      отменить прием
                    </a>
                  </div>

                  <div className="note__card-info">
                    <h4 className="note__card-title">Врач</h4>
                    <p>Иванова Ивана Ивановна</p>
                    <h4 className="note__card-title">
                      Ссылка на онлайн-консультацию
                    </h4>
                    <a href="">https://zoom.us/</a>
                  </div>

                  <div className="note__card-pet">
                    <h4 className="note__pet-title">Питомец</h4>
                    <p>Имя питомца</p>
                    <h4 className="note__pet-title">Дата</h4>
                    <p>15.10.23</p>
                    <h4 className="note__pet-title">Время</h4>
                    <p>15:45</p>
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

export default Account;
