import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import TextField from "@mui/material/TextField";
import { fetchResetPassword } from "../../redux/slices/auth";

const PasswordChange = ({ isOpen, onClose, phoneExists }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(fetchResetPassword({ phone: phoneExists, newPassword: data.password }));
      onClose();
      navigate(`/login`, { replace: true });
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
      alert("Ошибка при сбросе пароля. Попробуйте еще раз.");
    }
  };
  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="modal-onetimecode">
            <div className="modal-content">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <h2 className="onetimecode__title">Измените пароль</h2>
              <form
                className="onetimecode__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextField
                  className="login__form-input form-input"
                  type="password"
                  label="Новый пароль"
                  {...register("password", {
                    required: "Введите новый пароль",
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password ? errors.password.message : ""}
                />
                <button className="onetimecode__form-btn" type="submit">
                  Подтвердить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChange;
