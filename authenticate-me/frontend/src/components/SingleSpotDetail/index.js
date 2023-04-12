import { useHistory } from 'react-router';
import './SingleSpotDetail.css'

const SingleSpotDetail = ({ spot, key }) => {

  const history = useHistory();

  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
}

  let previewImg;
  spot.previewImage ? previewImg = spot.previewImage : previewImg = 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'

  return (
    <div className="detail-box"  onClick={handleClick}>
      <div className='image-box tooltip'>
        <span className='tooltiptext'>{spot.name}</span>
        <img src={previewImg} alt='' className='image'></img>
      </div>
      <div>
        <p className='location-rating'>
          <span>{spot.city}, {spot.state}</span>
          <span><i className="fa-solid fa-star"></i> {spot.avgRating}</span>
        </p>
      </div>
      <p className='price'>${spot.price} per night</p>
    </div>
  );
};

export default SingleSpotDetail;
