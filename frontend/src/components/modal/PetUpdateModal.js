import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPetsUpdate, fetchPets } from "../../redux/slices/pets";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "../../axios";

import "./styles/style-petcreate.css";

const PetUpdateModal = ({
  isOpen,
  onClose,
  id,
  petId,
  name,
  breed,
  gender,
  species,
  age,
  avatarUrll,
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
      const newData = {...data, avatarUrl};
      console.log(newData);
      await dispatch(
        fetchPetsUpdate({ userId: id, petId: petId, params: newData })
      );
      await dispatch(fetchPets(id));
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
              <p className="modal-title">Изменить данные о питомце</p>
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
                  defaultValue={name}
                  {...register("name", { required: "Укажите имя питомца" })}
                  error={Boolean(errors.name)}
                  helperText={errors.name ? errors.name.message : ""}
                />
                <p>{console.log(name)}</p>
                <TextField
                  className="modal-input"
                  type="text"
                  defaultValue={species}
                  {...register("species", { required: "Укажите тип питомца" })}
                  error={Boolean(errors.species)}
                  helperText={errors.species ? errors.species.message : ""}
                />

                <TextField
                  className="modal-input"
                  type="text"
                  defaultValue={breed}
                  {...register("breed", { required: "Укажите породу питомца" })}
                  error={Boolean(errors.breed)}
                  helperText={errors.breed ? errors.breed.message : ""}
                />

                <TextField
                  className="modal-input"
                  type="text"
                  defaultValue={age}
                  {...register("age", { required: "Укажите возраст питомца" })}
                  error={Boolean(errors.age)}
                  helperText={errors.age ? errors.age.message : ""}
                />

                <TextField
                  className="modal-input"
                  select
                  label="Пол"
                  SelectProps={{
                    native: true,
                  }}
                  {...register("gender", {
                    required: "Укажите возраст питомца",
                  })}
                  error={Boolean(errors.gender)}
                  helperText={errors.gender ? errors.gender.message : ""}
                >
                  <option value="мужской">Мужской</option>
                  <option value="женский">Женский</option>
                </TextField>

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

export default PetUpdateModal;
