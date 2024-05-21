import React, { useState } from "react";
import { useForm } from "react-hook-form";

import PasswordChange from "./PasswordChange";
import TextField from "@mui/material/TextField";
import "./styles/style-code.css";

function OneTimeCode({ isOpen, onClose, phoneExists }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    onClose();
    openModal();
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
              <h2 className="onetimecode__title">Введите одноразовый код</h2>
              <form
                className="onetimecode__form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextField
                  type="text"
                  inputProps={{ maxLength: 6 }}
                  className="otp-input"
                  fullWidth
                  variant="outlined"
                  label="Одноразовый код"
                  error={!!errors.code}
                  helperText={errors.code ? errors.code.message : ""}
                />

                <button className="onetimecode__form-btn" type="submit">
                  Подтвердить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <PasswordChange
        isOpen={isModalOpen}
        onClose={closeModal}
        phoneExists={phoneExists}
      />
    </div>
  );
}

export default OneTimeCode;
