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
  spot.previewImage ? previewImg = spot.previewImage : previewImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzi4ozl7Ve2KkOWNNXRYDqFL79rx842XNPMFSUK9WwYFCZKJiZjGS25i9xoqirElCeUKL5VFC7MYM&usqp=CAU&ec=48665701'

  return (
    <div className='all-spots'>
      <div className="detail-box" onClick={handleClick}>
        <div className='image-box tooltip'>
          <span className='tooltiptext'>{spot.name}</span>
          <img src={previewImg} alt='' className='image'></img>
        </div>
        <div>
          <p className='location-rating'>
            <div className='city-state'>
            <span>{spot.city},</span>
            <span>{spot.state}</span>
            </div>
            <span className='bold'><i className="fa-solid fa-star"></i> {+spot.avgRating <= 5 ? spot.avgRating : 'New'}</span>
          </p>
        </div>
        <div className='price'><span>${spot.price.toFixed(2)}</span> night</div>
      </div>
      {
        owned === true &&
        <div className='update-delete-buttons'>
          <button onClick={handleUpdate} className='update-button'>Update</button>
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
