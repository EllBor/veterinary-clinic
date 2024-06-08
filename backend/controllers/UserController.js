import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import twilio from "twilio";
import { validationResult } from "express-validator";
import slugify from "slugify";
import UserModel from "../models/User.js";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(404).json({
        message: "Неверный номер или пароль",
      });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный номер или пароль",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    
    const slug = slugify(req.body.fullName, { lower: true });

    const doc = new UserModel({
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      phone: req.body.phone,
      secretAnswer: req.body.secretAnswer,
      passwordHash: hash,
      slug,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const usersSlug = req.params.slug;
    const user = await UserModel.findOne( {slug: usersSlug });
    if (!user) {
      return res.status(404).json({
        message: "Пользоваель не найден",
      });
    }
    res.json([user]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить пользователя",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const slug = slugify(req.body.fullName, { lower: true });
    await UserModel.updateOne(
      {
        _id: userId,
      },
      {
        fullName: req.body.fullName,
        phone: req.body.phone,
        slug,
        avatarUrl: req.body.avatarUrl,
        aboutUser: req.body.aboutUser,
      }
    );
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    res.json([user]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось обновить информацию",
    });
  }
};

export const checkUserByPhoneAnswer = async (req, res) => {
  try {
    const { phone, secretAnswer } = req.body;
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Номер телефона обязателен" });
    }

    if (!secretAnswer) {
      return res
        .status(400)
        .json({ success: false, message: "Ответ обязателен" });
    }

    const user = await UserModel.findOne({ phone: phone, secretAnswer: secretAnswer });
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "Пользователь существует", user });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Пользователь не найден" });
    }
  } catch (error) {
    console.error("Error checking user by phone:", error);
    return res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { phone, newPassword, secretAnswer } = req.body;
    const user = await UserModel.findOne({ phone: phone, secretAnswer: secretAnswer });
    if (!user) {
      return res.status(404).json({ message: "Неверный ответ или номер телефона" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.passwordHash = hash;
    user.resetCode = null;
    await user.save();

    res.json({ message: "Пароль успешно обновлен" });
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error);
    res.status(500).json({ message: "Ошибка при сбросе пароля" });
  }
};