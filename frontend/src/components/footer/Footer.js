import { NavLink } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';

import "./style.css";
import "../../styles/style.css";
import logo_footer from "../../images/logo-footer.svg";
import vk from "../../images/vk.svg";
import facebook from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="top__logo">
            <NavLink  to="/">
              <img className="logo_footer" src={logo_footer} alt="logo" />
            </NavLink>
          </div>
          <div className="top__name">
            <h2 className="name__title">Зоодоктор</h2>
            <p className="name__text">ветеринарная клиника</p>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="bottom__confidentiality">
            Политика конфиденциальности в отношении обработки персональных
            данных
          </p>
          <div className="nav__bottom">
            <ul className="nav__bottom-list">
              <li className="nav__bottom-item">
                <NavLink className="nav__bottom-link" to="/history" onClick={scrollToTop}>
                  О нас
                </NavLink>
              </li>
              <li className="nav___bottom-item">
                <NavLink className="nav__bottom-link" to="/stocks" onClick={scrollToTop}>
                  Новости и акции
                </NavLink>
              </li>
              <li className="nav___bottom-item">
                <Link className="nav__bottom-link" to="/#contacts-section">
                  Контакты
                </Link>
              </li>
              <li className="nav__bottom-item">
                <NavLink className="nav__bottom-link" to="/question-answer" onClick={scrollToTop}>
                  Часто задаваемые вопросы
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="bottom__social">
            <ul className="bottom__social-list">
              <li className="bottom__social-link">
                <NavLink to="https://www.facebook.com" target="_blank">
                  <img
                    className="bottom__link-img"
                    src={facebook}
                    alt="facebook"
                  />
                </NavLink>
              </li>
              <li className="bottom__social-link">
                <NavLink to="https://m.vk.com" target="_blank">
                  <img 
                    className="bottom__link-img" 
                    src={vk} 
                    alt="vk" 
                  />
                </NavLink>
              </li>
              <li className="bottom__social-link">
                <NavLink to="https://www.instagram.com" target="_blank">
                  <img
                    className="bottom__link-img"
                    src={instagram}
                    alt="instagram"
                  />
                </NavLink>
              </li>
            </ul>
            <a
              className="bottom__social-link"
              href="mailto:aibolit34@gmail.com"
            >
              aibolit34@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
