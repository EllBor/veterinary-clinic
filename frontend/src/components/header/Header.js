import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector} from "react-redux";
import { HashLink as Link } from 'react-router-hash-link';

import "./style.css";
import logo from "../../images/logo.svg";
import question from "../../images/question.svg";


const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector((state) => state.auth.id);

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
              <NavLink className="nav__list-item question" href="#">
                <img className="question__img" src={question} alt="question" />
              </NavLink>
              <span className="tooltip-text" id="top">
                Задать вопрос
              </span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
