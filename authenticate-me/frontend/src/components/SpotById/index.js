import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spot';
import './SpotById.css'
import { useHistory, useParams } from 'react-router';
import SmallImages from '../SmallImages/SmallImages';
import { getReviewsBySpotIdThunk } from '../../store/review';
import SpotReviews from './SpotReviews';

const SpotById = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.review.spot)
    const spot = useSelector(state => state.spot.singleSpot);
    const reviews = Object.values(reviewsObj);


    useEffect(() => {
        dispatch(getReviewsBySpotIdThunk(id));
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getSpotByIdThunk(id));
    }, [dispatch, id, reviews.length]);

    // console.log('index reviews', reviews)
    // console.log('session user', sessionUser)

    if (!spot || !spot.Owner || !reviews) return null

    let spotImages;
    let previewImg = [];
    let nonPreviewImages = [];

    spotImages = spot.Spotimages;

    if (spotImages && spotImages.length > 0) {
        previewImg = spotImages.find(i => i.preview === true);
        nonPreviewImages = spotImages.filter(i => i.preview === false)
    }

    const numReviews = reviews.length

    const handleReserve = () => {
        alert("Feature coming soon!");
    }

    return (
        <div className='spot-id'>
            <div className='spot-id-card'>
                <h1>{spot.name}</h1>
                <h4>{spot.city}, {spot.state}, {spot.country}</h4>
                <div className='images-box'>
                    <div className='big-image-box'>
                        <img src={previewImg ? previewImg.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzi4ozl7Ve2KkOWNNXRYDqFL79rx842XNPMFSUK9WwYFCZKJiZjGS25i9xoqirElCeUKL5VFC7MYM&usqp=CAU&ec=48665701'} className='big-image'></img>
                    </div>
                    <div className='small-image-box'>
                        <SmallImages images={nonPreviewImages} />
                    </div>
                </div>
                <div className='spot-id-details'>
                    <div className='spot-description'>
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className='spot-info'>
                        <div className='price-rating-review'>
                            <p>${spot.price.toFixed(2)} per night</p>
                            {numReviews
                                ? <h5><i className="fa-solid fa-star"></i> {spot.avgRating} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}</h5>
                                : <p><i className="fa-solid fa-star"></i> New</p>
                            }
                        </div>
                        <button onClick={handleReserve} className='reserve-button'>Reserve</button>
                    </div>
                </div>
                <div className='border'></div>
                <div className='spot-details-reviews'>
                    {/* {console.log('reviews reached!')} */}
                    {numReviews
                        ? <div>
                            <h3><i className="fa-solid fa-star"></i> {spot.avgRating} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}</h3>
                            <SpotReviews reviews={reviews} spotId={id} />
                        </div>
                        : <div>
                            <h3><i className="fa-solid fa-star"></i> New</h3>
                            <SpotReviews reviews={reviews} first={true} spotId={id} />
                        </div>
                    }
                </div>
            </div>
        </div>

    );
};

export default SpotById;
