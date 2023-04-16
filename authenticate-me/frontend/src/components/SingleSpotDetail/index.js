import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import './SingleSpotDetail.css'
import OpenModalButton from '../OpenModalButton'
import DeleteModal from './DeleteModal';

const SingleSpotDetail = ({ spot, key, owned }) => {

  const history = useHistory();
  const dispatch = useDispatch();


  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
  }

  const handleUpdate = (e) => {
    e.stopPropagation();
    history.push(`/spots/${spot.id}/edit`);
  }

  let previewImg;
  spot.previewImage ? previewImg = spot.previewImage : previewImg = 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'

  return (
    <div className='all-spots'>
      <div className="detail-box" onClick={handleClick}>
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
      {
        owned === true &&
        <div>
          <button onClick={handleUpdate}>Update</button>
          <OpenModalButton
            buttonText='Delete Spot'
            modalComponent={<DeleteModal spotId={spot.id}/>}
          />
        </div>
      }
    </div>
  );
};

export default SingleSpotDetail;
