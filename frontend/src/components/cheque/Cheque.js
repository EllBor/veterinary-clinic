
import pdf from "../../images/pdf.png";

const Cheque = ({paymentDate, receiptNumber, filePath}) => {
  return (
      <div className="cheque__list-item">
        <h3 className="cheque__item-title">
          Чек об оплате от <span>{paymentDate}</span>
        </h3>
        <a className="cheque__item-file" to={filePath}>
          <img src={pdf} alt="cheque" />
          {receiptNumber}
        </a>
      </div>
  );
};

export default Cheque;
