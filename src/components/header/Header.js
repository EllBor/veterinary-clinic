import { NavLink } from "react-router-dom";

import "./style.css";

import logo from "../../images/logo.svg";
import question from "../../images/question.svg";
import map from "../../images/map.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <ul className="nav__list">
            <li className="nav__list-item">
              <NavLink className="nav__list-item logo" to="/">
                <img className="logo__img" src={logo} alt="logo" />
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink className="nav__list-item" to="/account">
                ЛИЧНЫЙ КАБИНЕТ
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink className="nav__list-item" to="/history">
                О НАС
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink className="nav__list-item" to="/stocks">
                НОВОСТИ И АКЦИИ
              </NavLink>
            </li>
            <li className="nav__list-item">
              <NavLink className="nav__list-item" href="#">
                КОНТАКТЫ
              </NavLink>
            </li>
            <li className="nav__list-item hover-text">
              <NavLink className="nav__list-item question" href="#">
                <img className="question__img" src={question} alt="question" />
              </NavLink>
              <span className="tooltip-text" id="top">
                Задать вопрос
              </span>
            </li>
            <li className="nav__list-item item-map">
              <NavLink className="map" href="#">
                <img src={map} alt="city" />
                НОВОСИБИРСК
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
