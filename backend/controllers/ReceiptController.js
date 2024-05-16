import PaymentReceiptModel from "../models/PaymentReceipt.js";
import UserModel from "../models/User.js";
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const downloadPdf = async (req, res) => {
  const fileName = req.params.fileName;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, '../uploads/cheque/', fileName);
  res.download(filePath);
};

export const create = async (req, res) => {
  try {
    const number = generateReceiptNumber();
    const newReceipt = new PaymentReceiptModel({
      user: req.params.id,
      receiptNumber: number,
      amount: req.body.amount,
      service: req.body.service,
      userFullName: req.body.userFullName,
      clinicAddress: req.body.clinic_address,
      doctorName: req.body.doctorName,
      petName: req.body.petName,
      paymentMethod: req.body.paymentMethod
    });
    const filePath = generateReceipt(newReceipt);
    newReceipt.filePath = filePath;

    const savedReceipt = await newReceipt.save();

    res.json([savedReceipt]);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

function generateReceiptNumber() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  let result = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}

function generateReceipt(receipt) {
  const doc = new PDFDocument();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const fileName = `receipt_${receipt.receiptNumber}.pdf`;
  const filePath = path.join(__dirname, '../uploads/cheque/', fileName);
  doc.font(path.join(__dirname, '../fonts/Inter-Regular.otf'));

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);
  doc.text(`Номер чека: ${receipt.receiptNumber}`);
  doc.text(`Дата оплаты: ${receipt.paymentDate}`);
  doc.text(`Сумма: ${receipt.amount}`);
  doc.text(`Услуга: ${receipt.service}`);
  doc.text(`ФИО пользователя: ${receipt.userFullName}`);
  doc.text(`Адрес клиники: ${receipt.clinicAddress}`);
  doc.text(`Имя врача: ${receipt.doctorName}`);
  doc.text(`Имя питомца: ${receipt.petName}`);
  doc.text(`Способ оплаты: ${receipt.paymentMethod}`);
  doc.end();
  return filePath; 
}

 export const getAll = async (req, res) => {
  try {
    const userId = req.params.id;
    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const receipt = await PaymentReceiptModel.find({ user: userId });
    if (!receipt) {
      return res.status(404).json({
        message: "Чек не найден",
      });
    }
    res.json(receipt);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось получить чек",
    });
  }
};