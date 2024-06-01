import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {
  fetchAuth,
  selectIsAuth,
  selectIsAuthSlug,
  fetchAuthMe,
} from "../redux/slices/auth";

import "../styles/login-register.css";

const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const slug = useSelector(selectIsAuthSlug);
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
      } else if (source === "order-services") {
        navigate(`/order-services`, { replace: true });
      }
    } else {
      navigate(`/account/${slug}`, { replace: true });
    }
  }

  const handleRegistrationClick = () => {
    if (from === "appointment") {
      if (source === "order") {
        navigate(`/registration?from=appointment&source=order`, {
          replace: true,
        });
      } else if (source === "order-card") {
        navigate(`/registration?from=appointment&source=order-card`, {
          replace: true,
        });
      } else if (source === "order-services") {
        navigate(`/registration?from=appointment&source=order-services`, {
          replace: true,
        });
      }
    } else {
      navigate(`/registration`, { replace: true });
    }
  };

  const handleResetClick = () => {
    navigate(`/password-reset`, { replace: true });
  };

  return (
    <main className="main">
      <section className="login">
        <div className="container">
          <div className="login__inner inner">
            <h1 className="login__title title-form">Войти в личный кабинет</h1>
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

              <TextField
                className="login__form-input form-input"
                type="password"
                label="Пароль"
                {...register("password", { required: "Введите пароль" })}
                error={Boolean(errors.password)}
                helperText={errors.password ? errors.password.message : ""}
              />
              
              <button
                className="login__form-btn form-btn"
                type="submit"
                disabled={!isValid}
              >
                Войти
              </button>
            </form>
            <button
              className="login__link form-link"
              onClick={handleResetClick}
            >
              Не могу вспомнить пароль
            </button>
            <button
              className="login__link form-link"
              onClick={handleRegistrationClick}
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
