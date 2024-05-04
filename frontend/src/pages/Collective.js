import React from "react";
import { NavLink } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import collective_page from "../images/collective-page.png";
import "../styles/style-collective.css";

import Doctors from "../components/doctors/Doctors";
import { fetchDoctors } from "../redux/slices/doctors";

const Collective = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(state => state.doctors);
  const isDoctorsLoading = doctors.status === 'loading';
  
  React.useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <main>
      <section className="collective">
        <div className="container">
          <div className="collective__inner">
            <h1 className="collective__title">Коллектив</h1>

            <div className="collective__about">
              <NavLink className="appointment__back back collective-back" to="/">
                НАЗАД
              </NavLink>
              <img
                className="collective__img"
                src={collective_page}
                alt={collective_page}
              />
              <div className="collective__part-about">
                <h3 className="collective__part-title">О нас</h3>
                <p className="collective__part-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum
                </p>
              </div>

              <div className="collective__specialists">
                <h3 className="collective__specialists-title">Специалисты</h3>
                <div className="collective__specialists-grid">
                  {(isDoctorsLoading ? [...Array(3)] : doctors.items || []).map((obj, index) => 
                  isDoctorsLoading ? (
                    <Doctors key={`loading-doctors-${index}`} isLoading = {true}/>
                  ):(
                    <Doctors
                      key={`doctors-${obj._id}`}
                      id={obj._id}
                      specialization = {obj.specialization}
                      avatarUrl = {obj.avatarUrl}
                      fullName = {obj.fullName}
                      experience = {obj.experience}
                      level_education = {obj.level_education}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Collective;
