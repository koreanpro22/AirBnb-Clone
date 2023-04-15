import { useDispatch } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from './DeleteReviewModal'
import CreateReviewModal from './CreateReviewModal';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getReviewsBySpotIdThunk } from '../../store/review';
import { getSpotByIdThunk } from '../../store/spot';

function SpotReviews({ reviews, first, spotId }) {
    // console.log('spot reviews', reviews)

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reviewsStateObj = useSelector(state => state.review);
    const reviewsState = Object.values(reviewsStateObj);
    const spot = useSelector(state => state.spot.singleSpot);
    console.log('single spot', spot)



    useEffect(() => {
        dispatch(getReviewsBySpotIdThunk(spotId));
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId));
    }, [dispatch, spotId]);
    // console.log(reviews[0].User)

    // console.log('review state', reviewsState.spot)
    // if (!reviewsStateObj.spot.length) return null
    // if (!reviews) return null


    if (!spot || !spotId) return null


    const months = {
        "01": "January",
        "02": "Febuary",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    // console.log(sessionUser)
    // console.log('spot reviews', reviews)
    console.log('prop reviews', reviews)
    if (!sessionUser) return null

    return (
        <div>
            {(sessionUser.id !== spot.ownerId) && !(reviews.find(r => r.userId === sessionUser.id)) && <div>
                <OpenModalButton
                    buttonText='Create Review'
                    modalComponent={<CreateReviewModal spotId={spotId} />} />
            </div>}

            {!reviews.length ? (<div>
                <p>Be the first to post a review!</p>
            </div>)
                : (<div>
                    {reviews.map(r => {
                        console.log('mapped review', r)
                        return !r.User ? null :
                        (
                            <div>
                                <div>
                                    <h4>{r.User.firstName} {r.User.lastName}</h4>
                                    <p>{months[r.createdAt.slice(5, 7)]} {r.createdAt.slice(0, 4)}</p>
                                    <p>{r.review}</p>
                                    {(r.userId === sessionUser.id) && <div>
                                        <OpenModalButton
                                            buttonText='Delete Review'
                                            modalComponent={<DeleteReviewModal reviewId={r.id} spotId={spotId}/>}
                                        />
                                    </div>}
                                </div>
                            </div>
                        )
                    })}
                </div>)
            }

        </div>)
}

export default SpotReviews;
