import "../styles/login-register.css";

import { useState } from 'react';
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import TextField from "@mui/material/TextField";
import {Navigate} from "react-router-dom";
import { selectIsAuth, fetchRegister  } from "../redux/slices/auth";

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const {register, handleSubmit,  formState: {errors, isValid}} = useForm({
    defaultValue: {
      phone: '',
      password: '',
      fullName: '',
    },
    mode: 'onChange'
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (data.payload && data.payload._id) {
      setUserId(data.payload._id);
    } else {
      alert('Не удалось авторизоваться');
    }
  };

  if (isAuth && userId) {
    return <Navigate to={`/account/${userId}`} replace />;
  }

  return (
    <main>
      <section className="registration">
        <div className="container">
          <div className="registration__inner inner">
            <h1 className="registration__title title-form">Регистрация</h1>
            <form className="registration__form form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                className="registration__form-input form-input"
                type="text"
                label="ФИО"
                {...register("fullName", { required: 'Введите ФИО' })}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName ? errors.fullName.message : ""}
              ></TextField>
              <TextField
                className="registration__form-input form-input"
                type="tel"
                label="Номер телефона"
                {...register("phone", { required: 'Укажите номер телефона' })}
                error={Boolean(errors.phone)}
                helperText={errors.phone ? errors.phone.message : ""}
              ></TextField>
              <TextField
                className="registration__form-input form-input"
                type="password"
                label="Пароль"
                {...register("password", { required: 'Введите пароль' })}
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ""}
              ></TextField>
              <button className="registration__form-btn form-btn" type="submit" disabled={!isValid}>
                Зарегистрироваться
              </button>
            </form>
            <NavLink className="registration__link form-link" to="/login">
              Назад
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
