import React from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/account.css";

import pdf from "../images/pdf.png";
import account_foto from "../images/account-foto.png";

import doc_foto from "../images/doc-foto.png";

import Pets from "../components/pets/Pets";
import { fetchPets } from "../redux/slices/pets";

const Account = ({userId}) => {
  const dispatch = useDispatch();
  const pets = useSelector(state => state.pets);
  const isPetsLoading = pets.status === 'loading';
  React.useEffect(() => {
    console.log(userId);
    dispatch(fetchPets(userId));
  }, [userId]);
  
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
                    Чек об оплате от <span>15.06.23</span>
                  </h3>2
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
                {(isPetsLoading ?[...Array(3)] : pets.items || []).map((obj, index) => 
                  isPetsLoading ? (
                    <Pets key = {index} isLoading = {true}/>
                  ):(
                    <Pets
                      key={obj._id}
                      name = {obj.name}
                      breed = {obj.breed}
                      gender = {obj.gender}
                      species = {obj.species}
                      age = {obj.age}
                      user = {obj.user}
                      avatarUrl = {obj.avatarUrl}
                    />
                  ))}
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
