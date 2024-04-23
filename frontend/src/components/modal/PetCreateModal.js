import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchPetsCreate, fetchPets } from "../../redux/slices/pets";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./styles/style-petcreate.css";

const PetCreateModal = ({ isOpen, onClose, id }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: 'onChange'
    });
    const inputFileRef = React.useRef(null);

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const {data} = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (error) {
            console.warn(error);
            alert('Ошибка при загрузке файла');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await dispatch(fetchPetsCreate({ userId: id, params: data })).unwrap();
            dispatch(fetchPets(id));
            onClose();
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            {isOpen && (
                <div className="pet__modal">
                    <div className="modal-content">
                        <span className="close" onClick={onClose}>&times;</span>
                        <p className='modal-title'>Добавить питомца</p>
                        <form className='modal-form' onSubmit={handleSubmit(onSubmit)}>
                            <div className="modal-file">
                                <Button onClick={() => inputFileRef.current.click()} disabled={loading}>
                                    Загрузить фото
                                </Button>
                                <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden></input>
                                {imageUrl && (
                                    <>
                                        <Button onClick={onClickRemoveImage} color="error" disabled={loading}>
                                            Удалить
                                        </Button>
                                        <img className='modal-img' src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
                                    </>
                                )}
                            </div>
                            <TextField 
                                className='modal-input'
                                type="text"
                                label='Имя'
                                {...register("name", { required: 'Укажите имя питомца' })}
                                error={Boolean(errors.name)}
                                helperText={errors.name ? errors.name.message : ""}
                            />

                            <TextField 
                                className='modal-input'
                                type="text"
                                label='Тип'
                                {...register("species", { required: 'Укажите тип питомца' })}
                                error={Boolean(errors.species)}
                                helperText={errors.species ? errors.species.message : ""}
                            />

                            <TextField 
                                className='modal-input'
                                type="text"
                                label='Пол'
                                {...register("gender", { required: 'Укажите пол питомца' })}
                                error={Boolean(errors.gender)}
                                helperText={errors.gender ? errors.gender.message : ""}
                            />

                            <TextField 
                                className='modal-input'
                                type="text"
                                label='Порода'
                                {...register("breed", { required: 'Укажите породу питомца' })}
                                error={Boolean(errors.breed)}
                                helperText={errors.breed ? errors.breed.message : ""}
                            />

                            <TextField 
                                className='modal-input'
                                type="text"
                                label='Возраст'
                                {...register("age", { required: 'Укажите возраст питомца' })}
                                error={Boolean(errors.age)}
                                helperText={errors.age ? errors.age.message : ""}
                            />

                            <button className='btn-create' type='submit' disabled={!isValid || loading}>Добавить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetCreateModal;
