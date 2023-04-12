import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = 'spot/getAllSpots';
const GET_SPOT_BY_ID = 'spot/getSpotById';
// const CREATE_SPOT = ''

const getAllSpots = (spots) => {

    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

const getSpotById = (spot) => {

    return {
        type: GET_SPOT_BY_ID,
        spot
    }
}




export const getSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllSpots(data))
        return data;
    }
}


export const getSpotByIdThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`);

    if (res.ok) {
        const spot = await res.json();
        // console.log('thunk spot ', spot)
        dispatch(getSpotById(spot));
        return spot;
    }
}

const initialState = { allSpots: null, singleSpot: null };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: null }
            const spots = action.spots.Spots
            spots.forEach(s => {
                newState.allSpots[s.id] = s
            });
            return newState
        }
        case GET_SPOT_BY_ID: {
            const spot = action.spot
            // console.log("reducer spot ", spot)
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            newState.singleSpot = spot;
            return newState
        }
        default: {
            return state;
        }
    }
}

export default spotReducer;
