import { csrfFetch } from "./csrf";

const GET_REVIEWS_BY_SPOT_ID = '';

const getReviewsBySpotId = (review) => {

    return {
        type: GET_REVIEWS_BY_SPOT_ID,
        review
    }
}

export const getReviewsBySpotIdThunk = (spotId) => async (dispatch) => {
    // console.log(spotId)
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getReviewsBySpotId(data));
        return data
    }
}


const initialState = { spot: {}, user: {} };

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS_BY_SPOT_ID: {
            const newState = {...state, spot: {}, user: null }
            const reviews = action.review.Reviews
            reviews.forEach(r => {
                newState.spot[r.id] = r
            });
            return newState
        }
        default: {
            return state;
        }
    }
}

export default reviewReducer;
