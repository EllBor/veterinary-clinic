import PaymentReceiptModel from "../models/PaymentReceipt.js";
import UserModel from "../models/User.js";
import PetModel from "../models/Pets.js";
import AnalysisResultModel from "../models/AnalysisResult.js";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import { dirname } from "path";
import { fileURLToPath } from "url";

export const downloadPdf = async (req, res) => {
  const fileName = req.params.fileName;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, "../uploads/cheque/", fileName);
  res.download(filePath);
};

export const downloadPdfResult = async (req, res) => {
  const fileName = req.params.fileName;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, "../uploads/analyzes/", fileName);
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
      paymentMethod: req.body.paymentMethod,
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
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let result = "";

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
  const filePath = path.join(__dirname, "../uploads/cheque/", fileName);
  doc.font(path.join(__dirname, "../fonts/Inter-Regular.otf"));

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

export const getAllReceipt = async (req, res) => {
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

export const getAllResult = async (req, res) => {
  try {
    const petId = req.params.petId;
    const petExists = await PetModel.exists({ _id: petId });
    if (!petExists) {
      return res.status(404).json({
        message: "Питомец не найден",
      });
    }

    const analysisResults = await AnalysisResultModel.find({ pet: petId });
    if (analysisResults.length === 0) {
      return res.status(404).json({ 
        message: "Результаты анализов не найдены",
      });
    }

    const fileUrls = [];
    for (const result of analysisResults) {
      const doc = new PDFDocument();
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const fileName = `receipt_${new Date(date).toLocaleDateString()}-${petId}.pdf`;
      const filePath = path.join(__dirname, "../uploads/cheque/", fileName);
      doc.font(path.join(__dirname, "../fonts/Inter-Regular.otf"));

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      doc.text(`Дата: ${result.date}`);
      doc.text(`Анализ: ${result.analysisName}`);
      doc.text(`Результат: ${result.result}`);
      doc.end();

      result.fileUrl = filePath; 
      await result.save();
    }
  
    res.json(fileUrls);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ошибка при генерации PDF",
    });
  }
};