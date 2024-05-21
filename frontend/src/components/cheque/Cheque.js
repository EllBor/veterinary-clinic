import pdf from "../../images/pdf.png";

const Cheque = ({ paymentDate, receiptNumber }) => {
  const downloadPdf = () => {
    const link = document.createElement("a");
    const fileName = `receipt_${receiptNumber}.pdf`;
    link.href = `http://localhost:4444/api/download-pdf/${fileName}`;
    link.setAttribute("download", `receipt_${receiptNumber}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="cheque__list-item">
      <h3 className="cheque__item-title">
        Чек об оплате от <span>{paymentDate}</span>
      </h3>
      <button className="cheque__item-file" onClick={downloadPdf}>
        <img src={pdf} alt="cheque" />
        {receiptNumber}
      </button>
    </div>
  );
};

export default Cheque;
