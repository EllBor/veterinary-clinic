import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { fetchUsers, fetchUsersUpdate } from "../../redux/slices/users";

const UserUpdateModal = ({
  isOpen,
  onClose,
  id,
  phone,
  name,
  surname,
  patronymic,
  aboutUser,
  avatarUrll
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [avatarUrl, setImageUrl] = useState(avatarUrll);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const inputFileRef = React.useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const fullName = data.name + " " + data.surname + " " + data.patronymic;
      phone =  data.phone;
      aboutUser = data.aboutUser;

      const fields = {
        fullName,
        phone,
        aboutUser,
        avatarUrl
      };

      await dispatch(fetchUsersUpdate({ userId: id, params: fields }));
      await dispatch(fetchUsers(id));
      onClose();
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="overlay">
          <div className="pet__modal modal">
            <div className="modal-content">
              <span className="close" onClick={onClose}>
                &times;
              </span>
              <p className="modal-title">Изменить информацию</p>
              <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-file">
                  <Button
                    onClick={() => inputFileRef.current.click()}
                    disabled={loading}
                  >
                    Загрузить фото
                  </Button>
                  <input
                    ref={inputFileRef}
                    type="file"
                    onChange={handleChangeFile}
                    hidden
                  ></input>
                  {avatarUrl && (
                    <>
                      <Button
                        onClick={onClickRemoveImage}
                        color="error"
                        disabled={loading}
                      >
                        Удалить
                      </Button>
                      <img
                        className="modal-img"
                        src={`http://localhost:4444${avatarUrl}`}
                        alt="Uploaded"
                      />
                    </>
                  )}
                </div>
                <TextField
                  className="modal-input"
                  type="text"
                  label="Имя"
                  defaultValue={name}
                  {...register("name", { required: "Укажите имя" })}
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name.message : ""}
                />

                <TextField
                  className="modal-input"
                  type="text"
                  label="Фамилия"
                  defaultValue={surname}
                  {...register("surname", { required: "Укажите фамилию" })}
                  error={Boolean(errors.surname)}
                  helperText={errors.surname ? errors.surname.message : ""}
                />

                <TextField
                  className="modal-input"
                  type="text"
                  label="Отчество"
                  defaultValue={patronymic}
                  {...register("patronymic", { required: "Укажите отчество" })}
                  error={Boolean(errors.patronymic)}
                  helperText={
                    errors.patronymic ? errors.patronymic.message : ""
                  }
                />

                <TextField
                  className="modal-input"
                  type="text"
                  label="Телефон"
                  defaultValue={phone}
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
                  className="modal-input"
                  type="text"
                  label="О себе"
                  defaultValue={aboutUser}
                  {...register("aboutUser", {
                    required: "Расскажите немного о себе",
                  })}
                  error={Boolean(errors.aboutUser)}
                  helperText={errors.aboutUser ? errors.aboutUser.message : ""}
                />

                <button
                  className="btn-create"
                  type="submit"
                  disabled={!isValid || loading}
                >
                  Изменить
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserUpdateModal;
