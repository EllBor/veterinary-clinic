import foto from "../../images/account-foto.png";

import RatingResult from "../rating/RatingResult";
import "../rating/style-ratingresult.css"

const Reviews = ({review_text, rating, publication_date, userfullName, userAvatar}) => {
  const safeFullName = userfullName || "";
  const parts = safeFullName.split(" ");
  const name = parts[1];
  
    return ( 
        <div className="feedback__card-item">
        <div className="feedback__card-foto">
          <img className="feedback__foto-img" src={userAvatar ? `http://localhost:4444${userAvatar}` : foto} alt="" />
        </div>
        <div className="feedback__card-main">
          <h4 className="feedback__main-title">Пользователь</h4>
          <p className="feedback__main-name">{name}</p>
          <h4 className="feedback__main-title">Отзыв</h4>
          <p className="feedback__main-comments">
            {review_text}
          </p>
        </div>
        <div className="feedback__rating">
          <p className="feedback__rating-date">{publication_date}</p>
          <RatingResult rating={rating} />
        </div>
      </div>
     );
}
 
export default Reviews;