import pet_foto from "../../images/pet-foto.png";
import pdf from "../../images/pdf.png";

const Pets = ({name, breed, gender, species, age, user, avatarUrl}) => {
  return (
    <div className="info__card-pet">
      <div className="info__card-foto card-foto">
        <img src={pet_foto} alt="" />
        <button className="info__card-text">
          Обновить данные о питомце 
        </button>
        <button className="info__card-text">
          Удалить данные о питомце
        </button>
      </div>

      <div className="info__card-info">
        <h3 className="info__card-main">{name}</h3>
        <h4 className="info__card-title">Тип</h4>
        <p>{species}</p>
        <h4 className="info__card-title">Пол</h4>
        <p>{gender}</p>
        <h4 className="info__card-title">Порода</h4>
        <p>{breed}</p>
        <h4 className="info__card-title">Возраст</h4>
        <p>{age}</p>
      </div>

      <div className="info__card-health">
        <h4 className="info__medical-title">Медицинская карта</h4>
        <div className="medical-card">
          <a className="medical-card__file" href="">
            <img src={pdf} alt="" />
            1025
          </a>
          <span className="medical-card__date">обновлена 25.06.23</span>
        </div>
        <h4 className="info__analyzes-title">Результаты анализов</h4>
        <div className="analyzes__box">
          <div className="analyzes__list-item">
            <a className="analyzes__item-file" href="">
              <img src={pdf} alt="" />
              ОАК
            </a>
            <span className="analyzes-card__date">25.06.23</span>
          </div>
          <div className="analyzes__list-item">
            <a className="analyzes__item-file" href="">
              <img src={pdf} alt="" />
              Узи брюшной полости
            </a>
            <span className="analyzes-card__date">25.06.23</span>
          </div>
          <div className="analyzes__list-item">
            <a className="analyzes__item-file" href="">
              <img src={pdf} alt="" />
              Биохимия крови
            </a>
            <span className="analyzes-card__date">25.06.23</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pets;
