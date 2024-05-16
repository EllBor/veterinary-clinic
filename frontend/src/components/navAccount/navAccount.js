import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchUsersDelete } from "../../redux/slices/users";

const NavAccount = ({ fullName, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const safeFullName = fullName || "";
  const parts = safeFullName.split(" ");
  const name = parts[2];

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };

  const onClickDeleteAccount = async () => {
    if (window.confirm("Вы действительно хотите удалить аккаунт?")) {
      await dispatch(fetchUsersDelete(id));
      await dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <nav className="account__nav">
      <h1 className="account__title">{name}</h1>
      <ul className="account__nav-list">
        <li className="account__list-item">
          <NavLink className="account__item-link" to="/appointment">
            ЗАПИСЬ НА ПРИЕМ
          </NavLink>
        </li>
        <li className="account__list-item">
          <a className="account__item-link" onClick={onClickLogout}>
            ВЫЙТИ
          </a>
        </li>
        <li className="account__list-item">
          <a className="account__item-link" onClick={onClickDeleteAccount}>
            УДАЛИТЬ АККАУНТ
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavAccount;
