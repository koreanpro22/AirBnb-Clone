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
    }, [dispatch, id]);

    // console.log('index reviews', reviewsObj)
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
        <div className='spot-id-card'>
            <h1>{spot.name}</h1>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div className='images-box'>
                <img src={previewImg ? previewImg.url : 'https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'} className='big-image'></img>
                <div className='small-images'>
                    <SmallImages images={nonPreviewImages} />
                </div>
            </div>
            <div>
                <div className='spot-description'>
                    <h2>Hosted By {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className='spot-info'>
                    <div className='price-rating-review'>
                        {console.log('spot', spot)}
                        {console.log('spot price', typeof(spot.price))}
                        <p>${Number(spot.price).toFixed(2)} per night</p>
                        {numReviews
                            ? <p><i className="fa-solid fa-star"></i>{spot.avgRating} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}</p>
                            : <p><i className="fa-solid fa-star"></i> New</p>
                        }
                    </div>
                    <button onClick={handleReserve}>Reserve</button>
                </div>
            </div>
            <div className='spot-details-reviews'>
                {/* {console.log('reviews reached!')} */}
                {numReviews
                    ? <div>
                        <p><i className="fa-solid fa-star"></i>{spot.avgRating} · {numReviews} {numReviews > 1 ? 'reviews' : 'review'}</p>
                        <SpotReviews reviews={reviews} spotId={id}/>
                    </div>
                    : <div>
                        <p><i className="fa-solid fa-star"></i> New</p>
                        <SpotReviews reviews={reviews} first={true} spotId={id}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default SpotById;
