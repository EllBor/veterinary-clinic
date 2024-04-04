const Courses = ({ title, date }) => {
  return (
    <div className="courses__slider-item">
      <span className="courses__slider-date">{date}</span>
      <p className="courses__slider-text">{title}</p>
    </div>
  );
};

export default Courses;
