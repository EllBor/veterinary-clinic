import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  fetchAuth,
  selectIsAuth,
  selectIsAuthId,
  fetchAuthMe,
} from "../redux/slices/auth";

import "../styles/login-register.css";

const PasswordReset = () => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthId = useSelector(selectIsAuthId);
  const dispatch = useDispatch();
  const location = useLocation();
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
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (data.payload && "token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
      dispatch(fetchAuthMe());
    } else {
      alert("Не удалось авторизоваться");
    }
  };

  if (isAuth) {
    if (from === "appointment") {
      if (source === "order") {
        navigate(`/order`, { replace: true });
      } else if (source === "order-card") {
        navigate(`/order-card`, { replace: true });
      }
    } else {
      navigate(`/account/${isAuthId}`, { replace: true });
    }
  }

  const handleBackClick = () => {
    navigate(`/login`, { replace: true });
  };

  return (
    <main>
      <section className="login">
        <div className="container">
          <div className="login__inner inner">
            <h1 className="login__title title-form">Сброс пароля</h1>
            <form
              className="login__form form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                className="login__form-input form-input"
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
              />

              <button
                className="reset__form-btn form-btn"
                type="submit"
                disabled={!isValid}
              >
                Получить одноразовый код
              </button>
              
            </form>
            <button
              className="login__link form-link"
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

export default PasswordReset;
