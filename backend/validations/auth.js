import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен быть больше 5 и меньше 32 символов").isLength(
    { min: 5, max: 32 }
  ),
  body("fullName", "Имя должно быть больше 3 символов").isLength({ min: 3 }),
  body("avatarUrl", "Некорректная ссылка на аватарку").optional().isURL(),
  body("phone", "Некорректный номер телефона").isMobilePhone(),
];
