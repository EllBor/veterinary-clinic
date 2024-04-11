import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";

const NavAccount = ({ fullName }) => {
  const safeFullName = fullName || "";
  const parts = safeFullName.split(" ");
  const name = parts[1];
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <nav className="account__nav">
      <h1 className="account__title">{name}</h1>
      <ul className="account__nav-list">
        <li className="account__list-item">
          <a className="account__item-link" href="#">
            ЗАПИСЬ НА ПРИЕМ
          </a>
        </li>
        <li className="account__list-item">
          <a className="account__item-link" onClick={onClickLogout}>
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
  );
};

export default NavAccount;
