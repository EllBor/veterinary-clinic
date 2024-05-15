import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import Slider from 'react-slick';

import account_doc from "../images/account-doc.png";
import "../styles/style-specialist.css";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Courses from "../components/courses/Courses";
import FeedbackModel from "../components/modal/FeedbackModel";
import DoctorAccount from "../components/doctorAccount/DoctorAccount";
import Reviews from "../components/reviews/Reviews";
import { selectIsAuth, fetchAuthMe } from "../redux/slices/auth";

import { fetchReviews } from "../redux/slices/reviews";
import { fetchDoctorAppointments, fetchOneDoctor } from "../redux/slices/doctors";

const Specialist = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    if (isAuth) { 
      setIsModalOpen(true);
    } else {
      alert("Для начала нужно авторизоваться");
    }
  };
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors);
  const reviews = useSelector((state) => state.reviews);
  const nearestAppointment = useSelector((state) => state.doctors.nearestAppointment);
  const isReviewsLoading = reviews.status === "loading";
  const isDoctorsLoading = doctors.status === "loading";

  React.useEffect(() => {
    dispatch(fetchReviews(id));
    dispatch(fetchOneDoctor(id));
    dispatch(fetchDoctorAppointments(id));
    dispatch(fetchAuthMe());
  }, [dispatch, id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };

  return (
    <main>
      <section className="account-specialist">
        <div className="container">
          <div className="account-specialist__inner">
            <div className="account-specialist__foto">
              <img src={account_doc} alt="" />
              <p className="account-specialist__time">
                ближайшая дата приема: {nearestAppointment ? new Date(nearestAppointment.start_date_time).toLocaleDateString() : 'запись недоступна'}
              </p>
              <NavLink className="account-specialist__btn" to="/appointment">
                ЗАПИСАТЬСЯ
              </NavLink>
              {isAuth && (
                <button
                  className="account-specialist__feedback"
                  onClick={openModal}
                >
                  ОСТАВИТЬ ОТЗЫВ
                  {console.log("reviews.items",reviews.items)}
                </button>
              )}
              <FeedbackModel isOpen={isModalOpen} onClose={closeModal} id={id}/>
            </div>

            <div className="account-specialist__part-main">
              <NavLink className="appointment__back back" to="/collective">
                НАЗАД
              </NavLink>
              {(isDoctorsLoading
                ? Array.from({ length: 3 })
                : doctors.items || []
              ).map((obj, index) =>
                isDoctorsLoading ? (
                  <DoctorAccount
                    key={`loading-doctor-${index}`}
                    isLoading={true}
                  />
                ) : (
                  <DoctorAccount
                    key={obj._id}
                    specialization={obj.specialization}
                    avatarUrl={obj.avatarUrl}
                    fullName={obj.fullName}
                    experience={obj.experience}
                    level_education={obj.level_education}
                  />
                )
              )}
              <h4 className="part-main__courses-title">Пройденные курсы</h4> 
              <Slider {...settings}>
                  {(  isDoctorsLoading 
                    ? Array.from({ length: 3 })
                    : doctors.items || []
                  ).map((obj, index) =>
                    isDoctorsLoading  ? (
                      <div key={`loading-doctor-courses-${index}`}>
                        <Courses isLoading={true} />
                      </div>
                    ) : (
                      obj.courses.map((course, courseIndex) => (
                        <div key={`${obj._id}-course-${courseIndex}`}>
                          <Courses
                            courseName={course.course_name}
                            completionDate={new Date(course.completion_date).getFullYear()}
                          />
                        </div>
                      ))
                    )
                  )}
                </Slider>
              <div className="account-specialist__feedback-box">
                <div className="feedback-box">
                  <h3 className="feedback-box__title">Отзывы</h3>
                  <span className="feedback-box__number">
                    {reviews.items ? reviews.items.length : 0} отзыв
                  </span>
                </div>
                {(isReviewsLoading
                  ? Array.from({ length: 3 })
                  : reviews.items || []
                ).map((obj, index) =>
                  isReviewsLoading ? (
                    <Reviews key={`loading-review-${index}`} isLoading={true} />
                  ) : (
                    <Reviews
                      key={obj._id}
                      review_text={obj.review_text}
                      rating={obj.rating}
                      publication_date={new Date(obj.publication_date).toLocaleDateString()}
                      userfullName={obj.user.fullName}
                      userAvatar={obj.user.avatarUrl}
                      level_education={obj.level_education}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Specialist;
