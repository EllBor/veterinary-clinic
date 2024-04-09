
const UserCard = ({ phone, avatarUrl, fullName, aboutUser}) => {
  return (
    <div className="account__personal">
      <div className="personal__card">
        <div className="personal__card-foto card-foto">
          <img src={avatarUrl} alt="" />
          <a href="#" className="personal__card-text">
            изменить
          </a>
        </div>

        <div className="personal__card-info">
          <h4 className="personal__card-title">Имя</h4>
          <p>Виктория</p>
          <h4 className="personal__card-title">Фамилия</h4>
          <p>Иванова</p>
          <h4 className="personal__card-title">Отчетсво</h4>
          <p>Александровна</p>
          <h4 className="personal__card-title">Телефон</h4>
          <p>{phone}</p>
        </div>

        <div className="personal__card-aboutme">
          <h4 className="personal__card-title">О себе</h4>
          <p className="personal__aboutme-text">
            {aboutUser}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
