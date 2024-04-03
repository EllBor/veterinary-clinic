const StocksAll = ({title, date, text, img}) => {
    return ( 
        <div className="stocks__item">
        <img src={img} alt={img} />
        <div className="stocks__item-box">
          <h3 className="stocks__item-title">{title}</h3>
          <span className="stocks__item-date">{date}</span>
          <p className="stocks__item-text">
           {text}
          </p>
        </div>
      </div>
     );
}
 
export default StocksAll;