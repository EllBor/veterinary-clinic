import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth, selectIsAuthId } from "../../redux/slices/auth";
import { HashLink as Link } from 'react-router-hash-link';

import "./style.css";
import logo from "../../images/logo.svg";
import question from "../../images/question.svg";
import menu_header from "../../images/menu-header.svg";
import app_back from "../../images/app-back.svg";

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(selectIsAuthId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const menuClass = isMenuOpen ? "rightside-menu rightside-menu--open" : "rightside-menu rightside-menu--close";

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
            {isAuth ? (
              <li className="nav__list-item">
                <NavLink className="nav__list-item" to={`/account/${userId}`}>
                  ЛИЧНЫЙ КАБИНЕТ
                </NavLink>
              </li>
            ) : (
              <li className="nav__list-item">
                <NavLink className="nav__list-item" to="/login">
                  ЛИЧНЫЙ КАБИНЕТ
                </NavLink>
              </li>
            )}
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
              <Link className="nav__list-item" to="/#contacts-section">
                КОНТАКТЫ
              </Link>
            </li>
            <li className="nav__list-item hover-text">
              <NavLink className="nav__list-item question" to="/question-answer">
                <img className="question__img" src={question} alt="question" />
              </NavLink>
              <span className="tooltip-text" id="top">
                Вопрос - ответ
              </span>
            </li>
            </ul>
            <NavLink className="rightside-menu__logo" to="/">
                <img className="logo__img" src={logo} alt="logo" />
            </NavLink>
            <button class="header__btn" onClick={toggleMenu}>
              <img src={menu_header} alt="icon menu" />
            </button>
            <div className={menuClass}>
              <button class="rightside-menu__close" onClick={toggleMenu}>
                <img src={app_back} alt="close" />
              </button>
              <div class="rightside-menu__content">
                <ul class="rightside-menu__list">
                {isAuth ? (
                    <li className="rightside-menu__list-item">
                      <NavLink className="rightside-menu__list-link" to={`/account/${userId}`}>
                        ЛИЧНЫЙ КАБИНЕТ
                      </NavLink>
                    </li>
                  ) : (
                    <li className="rightside-menu__list-item">
                      <NavLink className="rightside-menu__list-link" to="/login">
                        ЛИЧНЫЙ КАБИНЕТ
                      </NavLink>
                    </li>
                  )}
                  <li class="rightside-menu__list-item">
                  <NavLink className="rightside-menu__list-link" to="/history">
                    О НАС
                  </NavLink>
                  </li>
                  <li class="rightside-menu__list-item">
                  <NavLink className="rightside-menu__list-link" to="/stocks">
                    НОВОСТИ И АКЦИИ
                  </NavLink>
                  </li>
                  <li class="rightside-menu__list-item">
                  <Link className="rightside-menu__list-link" to="/#contacts-section">
                    КОНТАКТЫ
                  </Link>
                  </li>
                  <li class="rightside-menu__list-item">
                  <NavLink className="rightside-menu__list-link" to="/question-answer">
                    ВОПРОС-ОТВЕТ
                  </NavLink>
                  </li>
                </ul>
                </div>
            </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
