const GET_ALL_SPOTS = 'spot/getAllSpots';

const getAllSpots = (spots) => {

    return {
        type: GET_ALL_SPOTS,
        spots
    }
}



export const getSpotsThunk = () => async (dispatch) => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllSpots(data))
        return data;
    }
}

// const initialState = {
//     allSpots: {
//         [spotId]: {
//             spotData,
//         },
//         optionalOrderedList: [],
//     },
//     singleSpot: {
//         spotData,
//         SpotImages: [imagesData],
//         Owner: {
//             ownerData,
//         },
//     }
// }

const initialState = { allSpots: null, singleSpot: null };

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            const spots = action.spots.Spots
            spots.forEach(s => {
                newState.allSpots[s.id] = s
            });
            return newState
        }
        default: {
            return state;
        }
    }
}

export default spotReducer;
