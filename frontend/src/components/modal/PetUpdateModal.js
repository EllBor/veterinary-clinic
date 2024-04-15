import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPetsUpdate, fetchPets } from "../../redux/slices/pets";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

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
  avatarUrl,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await dispatch(
        fetchPetsUpdate({ userId: id, petId: petId, params: data })
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
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <p className="modal-title">Изменить данные о питомце</p>
            <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={gender}
                {...register("gender", { required: "Укажите пол питомца" })}
                error={Boolean(errors.gender)}
                helperText={errors.gender ? errors.gender.message : ""}
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
      )}
    </div>
  );
};

export default PetUpdateModal;
