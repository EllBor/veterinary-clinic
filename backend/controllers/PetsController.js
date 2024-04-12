import PetsModel from "../models/Pets.js";
import UserModel from "../models/User.js";
export const create = async (req, res) => {
  try {
    const doc = new PetsModel({
      name: req.body.name,
      breed: req.body.breed,
      gender: req.body.gender,
      species: req.body.species,
      age: req.body.age,
      user: req.userId,
      avatarUrl: req.body.avatarUrl,
    });
    const pet = await doc.save();
    res.json([pet]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось создать домашнего животного",
    });
  }
};

export const update = async (req, res) => {
  try {
    const petId = req.params.id;
    await PostModel.updateOne(
      {
        _id: petId,
      },
      {
        name: req.body.name,
        breed: req.body.breed,
        gender: req.body.gender,
        species: req.body.species,
        age: req.body.age,
        avatarUrl: req.body.avatarUrl,
      }
    );
    const pet = await doc.save();
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить информацию",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const petId = req.params.id;
    const userId = req.params.userId;
    PetsModel.deleteOne({ _id: petId, user: userId });
    const pet = await doc.save();
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось удалить домашнего животного",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const pet = await PetsModel.find({ user: userId });
    if (!pet) {
      return res.status(404).json({
        message: "Питомец не найдены",
      });
    }
    res.json(pet);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить питомца",
    });
  }
};
