import React, { useState } from 'react';
import './style-rating.css';

const Rating = ({ onChange }) => {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event) => {
        const selectedRating = parseInt(event.target.value);
        setRating(selectedRating);
        onChange(selectedRating); 
    };

    return ( 
        <div className="rating-area">
            <input type="radio" id="star-5" name="rating" value="5" onChange={handleRatingChange} />
            <label htmlFor="star-5" title="Оценка «5»"></label>	
            
            <input type="radio" id="star-4" name="rating" value="4" onChange={handleRatingChange} />
            <label htmlFor="star-4" title="Оценка «4»"></label>    
            
            <input type="radio" id="star-3" name="rating" value="3" onChange={handleRatingChange} />
            <label htmlFor="star-3" title="Оценка «3»"></label>  
            
            <input type="radio" id="star-2" name="rating" value="2" onChange={handleRatingChange} />
            <label htmlFor="star-2" title="Оценка «2»"></label>    
            
            <input type="radio" id="star-1" name="rating" value="1" onChange={handleRatingChange} />
            <label htmlFor="star-1" title="Оценка «1»"></label>
        </div>
     );
}
 
export default Rating;
