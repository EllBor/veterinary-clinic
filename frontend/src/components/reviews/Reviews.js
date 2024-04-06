import feedback_foto from "../../images/feedback-foto.svg";

const Reviews = ({review_text, rating, publication_date, user}) => {
    return ( 
        <div className="feedback__card-item">
        <div className="feedback__card-foto">
          <img src={feedback_foto} alt="" />
        </div>
        <div className="feedback__card-main">
          <h4 className="feedback__main-title">Пользоваель</h4>
          <p className="feedback__main-name">Виктория</p>
          <h4 className="feedback__main-title">Отзыв</h4>
          <p className="feedback__main-comments">
            {review_text}
          </p>
        </div>
      </div>
     );
}
 
export default Reviews;