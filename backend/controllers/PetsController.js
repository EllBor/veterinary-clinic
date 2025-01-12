import PetsModel from "../models/Pets.js";
import UserModel from "../models/User.js";
import MedicalHistoryModel from  "../models/MedicalHistory.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    const slug = slugify(req.body.name, { lower: true });
    const doc = new PetsModel({
      name: req.body.name,
      breed: req.body.breed,
      gender: req.body.gender,
      species: req.body.species,
      age: req.body.age,
      slug,
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
    const slug = slugify(req.body.name, { lower: true });
    await PetsModel.updateOne(
      {_id: petId,},
      {
        name: req.body.name,
        breed: req.body.breed,
        gender: req.body.gender,
        species: req.body.species,
        age: req.body.age,
        slug,
        avatarUrl: req.body.avatarUrl,
      }
    );
    const pet = await PetsModel.findById(petId);
    if (!pet) {
      return res.status(404).json({message: "Питомец не найден" });
    }
    res.json([pet]);
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
    const pet = await PetsModel.findOne({ _id: petId, user: userId });
    if (!pet) {
      return res.status(404).json({
        message: "Питомец не найден",
      });
    }
    await pet.deleteOne();
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

export const getOne = async (req, res) => {
  try {
    const petSlug = req.params.slug;
    const userId = req.params.userId;
    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const pet = await PetsModel.findOne({ user: userId, slug: petSlug });
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


export const getMedicalHistory = async (req, res) => {
  try {
    const petId = req.params.petId; 
    const medicalHistory = await MedicalHistoryModel.findOne({ pet: petId }); 
    res.json(medicalHistory); 
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить медицинскую историю",
    });
  }
};