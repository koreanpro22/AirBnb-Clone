import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AllSpots.css';
import { getSpotsThunk } from '../../store/spot';
import SingleSpotDetail from '../SingleSpotDetail';

function AllSpots() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const allSpotsObj = useSelector(state => state.spot.allSpots);

    useEffect(() => {
        dispatch(getSpotsThunk());
    }, [dispatch]);



    if (!allSpotsObj) return null

    const allSpots = Object.values(allSpotsObj);

    return (
        <div className='body'>
            {/* <h1>All Spots</h1> */}<br></br>
            {/* <h1>All Spots</h1> */}<br></br>
            <div className='spot-gallery'>
                {allSpots.length > 0 && allSpots.map(s => <SingleSpotDetail spot={s}/>
                )}
            </div>
        </div>
    )
}

export default AllSpots;
