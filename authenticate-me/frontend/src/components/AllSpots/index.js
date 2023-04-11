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

    // console.log('weird bug', allSpots);


    if (!allSpotsObj) return null

    const allSpots = Object.values(allSpotsObj);

    return (
        <div className='body'>
            <h1>All Spots</h1>
            <div className='spot-gallery'>
                {allSpots.length > 0 && allSpots.map(s => <SingleSpotDetail spot={s}/>
                )}
            </div>
        </div>
    )
}

export default AllSpots;
