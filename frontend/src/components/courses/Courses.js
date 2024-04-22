const Courses = ({ courseName, completionDate }) => {
  return (
    <div className="courses__slider-item">
      <span className="courses__slider-date">{completionDate}</span>
      <p className="courses__slider-text">{courseName}</p>
    </div>
  );
};

export default Courses;
