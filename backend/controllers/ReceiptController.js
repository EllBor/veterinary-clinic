import PaymentReceiptModel from "../models/PaymentReceiptModel.js";
import UserModel from "../models/UserModel.js";

export const create = async (req, res) => {
  try {
    const newReceipt = new PaymentReceiptModel({
      user: req.id,
      receiptNumber: generateReceiptNumber(),
      service: req.body.service,
      userFullName: fullName,
      clinicAddress: req.body.clinicAddress,
      doctorName: req.body.doctorName,
      petName: petName,
      paymentMethod: req.body.paymentMethod
    });
    const savedReceipt = await newReceipt.save();
    const filePath = generateReceipt(savedReceipt);
    savedReceipt.filePath = filePath;
    await savedReceipt.save();

    res.json({ success: true });
  } catch (error) {
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
  const fileName = `receipt_${receipt.receiptNumber}.pdf`;
  const filePath = path.join(__dirname, '..', 'receipts', fileName);
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