import { body } from "express-validator";

export const registerValidation = [
  body("password", "Пароль должен быть больше 5 и меньше 32 символов").isLength(
    { min: 5, max: 32 }
  ),
  body("fullName", "Имя должно быть больше 3 символов").isLength({ min: 3 }),
  body("phone", "Некорректный номер телефона").isMobilePhone(),

];

export const updateValidation = [
  body("fullName", "Имя должно быть больше 3 символов").isLength({ min: 3 }),
  body("phone", "Некорректный номер телефона").isMobilePhone(),
  body("avatarUrl", "Неверный URL").optional().isURL(),
  body("aboutUser", "О себе должно быть больше 3 символов").isLength({ min: 3 }),
  body("email", "Некорректная почта").isEmail(),
];

export const createValidation = [
  body("name", "Имя должно быть больше 3 символов").isLength({ min: 3 }),
  body("breed", "Название породы должно быть больше 3 символов").isLength({ min:3 }),
  body("gender").isIn(["мужской", "женский"]),
  body("species", "Тип питомца должен быть больше 3 символов").isLength({ min:3 }),
  body("age", "Возраст должен быть больше 3 символов").isLength({ min:3 }),
  body("avatarUrl", "Неверный URL").optional().isURL(),
];

export const ReviewsValidation = [
  body("review_text", "Отзыв должен быть больше 3 символов").isLength({ min: 3 }),
];