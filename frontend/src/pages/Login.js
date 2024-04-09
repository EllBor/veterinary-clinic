import "../styles/login-register.css";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import { fetchAuth, selectIsAuth } from "../redux/slices/auth";
import {Navigate} from "react-router-dom";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {register, handleSubmit, formState: {errors, isValid}} = useForm({
    defaultValue: {
      phone: '',
      password: ''
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if(!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/account"/>
  }

  return (
    <main>
      <section className="login">
        <div className="container">
          <div className="login__inner inner">
            <h1 className="login__title title-form">Войти в личный кабинет</h1>
            <form className="login__form form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className="login__form-input form-input"
              type="tel"
              label="Номер телефона"
              {...register("phone", { required: 'Укажите номер телефона' })}
              error={Boolean(errors.phone)}
              helperText={errors.phone ? errors.phone.message : ""}
            />
            <TextField
              className="login__form-input form-input"
              type="password"
              label="Пароль"
              {...register("password", { required: 'Введите пароль' })}
              error={Boolean(errors.password)}
              helperText={errors.password ? errors.password.message : ""}
            />
              <button className="login__form-btn form-btn" type="submit" disabled={!isValid}>Войти</button>
            </form>
            <NavLink className="login__link form-link" to="/registration">
              Зарегистрироваться
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
