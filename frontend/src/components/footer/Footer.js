import "./style.css";
import logo_footer from "../../images/logo-footer.svg";
import vk from "../../images/vk.svg";
import facebook from "../../images/facebook.svg";
import instagram from "../../images/instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="top__logo">
            <a href="#">
              <img src={logo_footer} alt="" />
            </a>
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
                <a className="nav__bottom-link" href="#">
                  Личный кабинет
                </a>
              </li>
              <li className="nav__bottom-item">
                <a className="nav__bottom-link" href="#">
                  О нас
                </a>
              </li>
              <li className="nav___bottom-item">
                <a className="nav__bottom-link" href="#">
                  Новости и акции
                </a>
              </li>
              <li className="nav___bottom-item">
                <a className="nav__bottom-link" href="#">
                  Контакты
                </a>
              </li>
              <li className="nav__bottom-item">
                <a className="nav__bottom-link" href="#">
                  Задать вопрос
                </a>
              </li>
            </ul>
          </div>
          <div className="bottom__social">
            <ul className="bottom__social-list">
              <li className="bottom__social-link">
                <a>
                  <img
                    className="bottom__link-img"
                    src={facebook}
                    alt="facebook"
                  />
                </a>
              </li>
              <li className="bottom__social-link">
                <a>
                  <img className="bottom__link-img" src={vk} alt="vk" />
                </a>
              </li>
              <li className="bottom__social-link">
                <a>
                  <img
                    className="bottom__link-img"
                    src={instagram}
                    alt="instagram"
                  />
                </a>
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
