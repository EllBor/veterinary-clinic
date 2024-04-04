const Reasons = ({title, img, text}) => {
  return (
    <li className="choice__grid-item">
      <h3 className="choice__item-title">{title}</h3>
      <div className="choice__grid-box">
        <img className="choice__item-img" src={img} alt={img} />
        <p className="choice__item-text">
          {text}
        </p>
      </div>
    </li>
  );
};

export default Reasons;
