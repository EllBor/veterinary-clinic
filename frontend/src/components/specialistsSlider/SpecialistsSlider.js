const SpecialistsSlider = ({img}) => {
    return ( 
        <div className="specialists__slider-item">
        <img
          className="specialists__slider-img"
          src={img}
          alt=""
        />
      </div>
     );
}
 
export default SpecialistsSlider;