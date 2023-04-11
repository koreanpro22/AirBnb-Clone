import './SingleSpotDetail.css'

const SingleSpotDetail = ({ spot, key }) => {


  return (
    <div className="detail-box">
      <img src={spot.previewImage} alt='Preview Image'></img>
      <h1>{spot.name}</h1>
      <p>{spot.address}</p>
      <p>{spot.price}</p>
      <p>{spot.avgRating}</p>
      <p>{spot.city}, {spot.state}</p>
    </div>
  );
};

export default SingleSpotDetail;
