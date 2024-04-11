const DoctorAccount = ({fullName, experience, specialization}) => {
    return ( 
        <>
        <div className="part-main__info-doc">
        <h3 className="part-main__title">{fullName}</h3>
        <span className="part-main__experience">{experience}</span>
      </div>
      <p className="part-main__specialization">
        {specialization}
      </p>
      </>
     );
}
 
export default DoctorAccount;