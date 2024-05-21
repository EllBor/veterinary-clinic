import pdf from "../../images/pdf.png";

const Analyzes = ({ petId, resultDate, analysisName }) => {

    const downloadPdf = () => {
        const link = document.createElement("a");
        const fileName = `receipt_${resultDate}-${petId}.pdf`;
        link.href = `http://localhost:4444/api/download-pdf-result/${fileName}`;
        link.setAttribute("download", `receipt_${resultDate}-${petId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      
    return ( 
        <div className="analyzes__list-item">
        <button className="analyzes__item-file" onClick={downloadPdf}>
          <img src={pdf} alt="pdf" />
            {analysisName}
        </button>
        <span className="analyzes-card__date">{resultDate}</span>
      </div>
     );
}
 
export default Analyzes;