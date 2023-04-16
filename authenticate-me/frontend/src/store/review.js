import { csrfFetch } from "./csrf";

const GET_REVIEWS_BY_SPOT_ID = 'review/GET_REVIEWS_BY_SPOT_ID';
const CREATE_REVIEW = 'review/CREATE_NEW_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';

const getReviewsBySpotId = (review) => {

    return {
        type: GET_REVIEWS_BY_SPOT_ID,
        review
    }
}

const createReview = (review) => {

    return {
        type: CREATE_REVIEW,
        review
    }
}


const deleteReview = (reviewId) => {

    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
    console.log('get reviews by Id thunk')
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const data = await res.json();
        console.log('reviews for spot by id data',data)
        dispatch(getReviewsBySpotId(data));
        return data
    }
}

export const createReviewThunk = (review, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const review = await res.json();
        // console.log('review created' , res)
        dispatch(createReview(review));
        return review;
    }
}


export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    console.log('delete thunk review id', reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(deleteReview(reviewId))
    }
}



const initialState = { spot: {}, user: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS_BY_SPOT_ID: {
            const newState = {...state, spot: {}, user: {} }
            const reviews = action.review.Reviews
            reviews.forEach(r => {
                newState.spot[r.id] = r
            });
            return newState
        }
        case CREATE_REVIEW: {
            const newState = {...state, spot: { ...state.spot }, user: { ...state.user } }
            const review = action.review;
            newState.spot[review.id] = review;
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state, spot: { ...state.spot }, user: { ...state.user} }
            delete newState.spot[action.reviewId]
            return newState
        }
        default: {
            return state;
        }
    }
}

export default reviewReducer;
