import PetsModel from "../models/Pets.js";
export const getAll = async (req, res) => {
    try {
        const userId = req.params.user;
        const pets = await PetsModel.find({ user: userId });
        if (!pets || pets.length === 0) {
            return res.status(404).json({
                message: "Домашние животные не найдены для данного пользователя",
            });
        }
        res.json(pets);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить домашних животных для данного пользователя",
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const petId = req.params.petId;
        const userId = req.params.userId;

        const pet = await PetsModel.findOne({ _id: petId, user: userId });
        if (!pet) {
            return res.status(404).json({
                message: "Домашнее животное не найдено для данного пользователя",
            });
        }
        res.json(pet);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить информацию о домашнем животном для данного пользователя",
        });
    }
};
  