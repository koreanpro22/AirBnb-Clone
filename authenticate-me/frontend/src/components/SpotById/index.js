import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spot';
import './SpotById.css'
import { useHistory, useParams } from 'react-router';
import SmallImages from '../SmallImages/SmallImages';
import { getReviewsBySpotIdThunk } from '../../store/review';

const SpotById = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.review.spot)
    const spot = useSelector(state => state.spot.singleSpot);
    const reviews = Object.values(reviewsObj);

    useEffect(() => {
        dispatch(getSpotByIdThunk(id));
    }, []);

    useEffect(() => {
        dispatch(getReviewsBySpotIdThunk(id));
    }, []);

    if (!spot) return null
    let spotImages;
    let previewImg = [];
    let nonPreviewImages = [];

    spotImages = spot.Spotimages;

    if (spotImages && spotImages.length > 0) {
        previewImg = spotImages.find(i => i.preview === true);
        nonPreviewImages = spotImages.filter(i => i.preview === false)
    }

    const numReviews = reviews.length

    return (
        <div>
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
                        <p>${spot.price.toFixed(2)} per night</p>
                        {numReviews
                            ? <p><i className="fa-solid fa-star"></i>{spot.avgRating} - {numReviews} reviews</p>
                            : <p><i className="fa-solid fa-star"></i> New</p>

                        }
                    </div>
                    <button>Reserve</button>
                </div>
            </div>
            <div>
                {numReviews
                    ? <div>
                        <p><i className="fa-solid fa-star"></i>{spot.avgRating} - {numReviews} reviews</p>
                        {/*~~~~~~~~~ Individual reviews component ~~~~~~~~*/}
                    </div>
                    : <p><i className="fa-solid fa-star"></i> New</p>
                }
            </div>
        </div>
    );
};

export default SpotById;
