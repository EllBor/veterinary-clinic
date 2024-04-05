import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

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
  
      const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarUrl: req.body.avatarUrl,
        phone: req.body.phone,
        passwordHash: hash,
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
        message: "Не удалось зарегестрироваться",
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