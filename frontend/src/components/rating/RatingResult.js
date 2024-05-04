
const RatingResult = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<span key={i} className="active">★</span>);
        } else {
            stars.push(<span key={i}>★</span>);
        }
    }

    return (
        <div className="rating-mini">
            {stars}
        </div>
    );
};

export default RatingResult;