import { NavLink } from "react-router-dom";

import vk_top from "../../images/vk-top.svg";
import facebook_top from "../../images/facebook-top.svg";
import instagram_top from "../../images/instagram-top.svg";

const TopSlider = ({title, img}) => {
    return ( 
        <div className="top__slider-item">
        <img className="top__slider-img" src={img} alt="slider-img" />
        <div className="top__slider-info">
          <h2 className="top__slider-title">
            {title}
          </h2>
          <NavLink to="/appointment" className="top__slider-btn">ЗАПИСАТЬСЯ</NavLink>
          <div className="top__slider-social">
            <NavLink to="https://www.facebook.com">
              <img className="top__slider-social-img" src={facebook_top} alt="facebook" />
            </NavLink>
            <NavLink to="https://m.vk.com">
              <img className="top__slider-social-img" src={vk_top} alt="vk" />
            </NavLink>
            <NavLink to="https://www.instagram.com">
              <img className="top__slider-social-img" src={instagram_top} alt="instagram" />
            </NavLink>
          </div>
        </div>
      </div>
     );
}
 
export default TopSlider;