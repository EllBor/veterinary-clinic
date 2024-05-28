import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { fetchCheckPhoneAnswer } from "../redux/slices/auth";
import PasswordChange from "../components/modal/PasswordChange";

import "../styles/login-register.css";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [phoneExists, setPhoneExists] = useState(""); 
  const [secretAnswerExists, setSecretAnswerExists] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValue: {
      phone: "",
      secretAnswer: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const resultAction = await dispatch(fetchCheckPhoneAnswer(values)).unwrap();
    if (resultAction.success) {
      setPhoneExists(resultAction.user.phone);
      setSecretAnswerExists(resultAction.user.secretAnswer);
      openModal();
    } else if (!resultAction.success) {
      alert("Неверный номер телефона или ответ на вопрос");
    }
  };

  const handleBackClick = () => {
    navigate(`/login`, { replace: true });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <main className="main">
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

              <TextField
                className="login__form-input form-input"
                type="text"
                label="Ответ на секретный вопрос"
                {...register("secretAnswer", {
                  required: "Укажите ответ на секретный вопрос",
                })}
                error={Boolean(errors.secretAnswer)}
                helperText={errors.secretAnswer ? errors.secretAnswer.message : ""}
              />

              <button
                className="reset__form-btn form-btn"
                type="submit"
                disabled={!isValid}
              >
                Подтвердить
              </button>
            </form>
            <button className="login__link form-link" onClick={handleBackClick}>
              Назад
            </button>
          </div>
        </div>
      </section>
      <PasswordChange
        isOpen={isModalOpen}
        onClose={closeModal}
        phoneExists={phoneExists}
        secretAnswerExists={secretAnswerExists}
      />
    </main>
  );
};

export default PasswordReset;
