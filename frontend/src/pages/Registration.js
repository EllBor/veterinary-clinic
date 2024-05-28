import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Navigate } from "react-router-dom";
import {
  selectIsAuth,
  fetchRegister,
  selectIsAuthId,
  fetchAuthMe,
} from "../redux/slices/auth";

import "../styles/login-register.css";

const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthId = useSelector(selectIsAuthId);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const from = params.get("from");
  const source = params.get("source");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValue: {
      phone: "",
      password: "",
      fullName: "",
      secretAnswer: "",
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (data.payload && "token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      dispatch(fetchAuthMe());
    } else {
      alert("Не удалось зарегистрироваться");
    }
  };

  if (isAuth) {
    const params = new URLSearchParams(location.search);
    const from = params.get("from");
    const source = params.get("source");
    if (from === "appointment") {
      if (source === "order") {
        return <Navigate to={`/order`} replace />;
      } else if (source === "order-card") {
        return <Navigate to={`/order-card`} replace />;
      } else if (source === "order-services") {
        return <Navigate to={`/order-services`} replace />;
      }
    } else {
      return <Navigate to={`/account/${isAuthId}`} replace />;
    }
  }

  const handleBackClick = () => {
    if (from === "appointment") {
      if (source === "order") {
        navigate(`/login?from=appointment&source=order`, { replace: true });
      } else if (source === "order-card") {
        navigate(`/login?from=appointment&source=order-card`, {
          replace: true,
        });
      } else if(source === "order-services") {
        navigate(`/login?from=appointment&source=order-services`, {
          replace: true,
        });
      }
    } else {
      navigate(`/login`, { replace: true });
    }
  };

  return (
    <main className="main">
      <section className="registration">
        <div className="container">
          <div className="registration__inner inner">
            <h1 className="registration__title title-form">Регистрация</h1>
            <form
              className="registration__form form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                className="registration__form-input form-input"
                type="text"
                label="ФИО"
                {...register("fullName", { required: "Введите ФИО" })}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName ? errors.fullName.message : ""}
              ></TextField>

              <TextField
                className="registration__form-input form-input"
                type="tel"
                label="Номер телефона"
                {...register("phone", {
                  required: "Укажите номер телефона",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Некорректный номер телефона",
                  },
                })}
                InputProps={{
                  startAdornment: "+7",
                }}
                error={Boolean(errors.phone)}
                helperText={errors.phone ? errors.phone.message : ""}
              ></TextField>

              <TextField
                className="registration__form-input form-input"
                type="password"
                label="Пароль"
                {...register("password", { required: "Введите пароль" })}
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ""}
              ></TextField>

              <InputLabel className="registration__form-label">Секретный вопрос: Ваш первый номер телефона</InputLabel>

              <TextField
                className="registration__form-input form-input"
                type="text"
                label="Ответ на секретный вопрос"
                {...register("secretAnswer", { required: "Введите ответ на секретный вопрос" })}
                error={Boolean(errors.secretAnswer)}
                helperText={errors.secretAnswer ? errors.secretAnswer.message : ""}
              ></TextField>

              <button
                className="registration__form-btn form-btn"
                type="submit"
                disabled={!isValid}
              >
                Зарегистрироваться
              </button>
            </form>
            <button
              className="registration__link form-link"
              onClick={handleBackClick}
            >
              Назад
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Registration;
