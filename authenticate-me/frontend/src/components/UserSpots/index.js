import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './UserSpots.css';
import { useHistory } from 'react-router';
import SingleSpotDetail from '../SingleSpotDetail';
import { getSpotsThunk } from '../../store/spot';
import { NavLink } from 'react-router-dom';

function UserSpots({ owned }) {

    const sessionUser = useSelector(state => state.session.user);
    const allSpotsObj = useSelector(state => state.spot.allSpots);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpotsThunk());
    }, [dispatch]);


    if (!allSpotsObj) return null

    const userSpots = Object.values(allSpotsObj).filter(s => {
        return s.ownerId === sessionUser.id
    })
    console.log(allSpotsObj);
    console.log(userSpots);

    if (!sessionUser) {
        return history.push('/');
    }

    return (
        <div className='body'>
            <div className='manage-spot-page'>

            <div className='manage-spot-header'>
                <h1>Manage Spots</h1>
                <button className='create-spot-button'>
                    <NavLink
                        to='/spots/new'
                        style={() => {
                            return {
                                color: "black",
                                textDecoration: "none"
                            }
                        }}>
                        Create a New Spot
                    </NavLink>
                </button>
            </div>
            <div className='spot-gallery'>
                {userSpots.length > 0 && userSpots.map(s => <SingleSpotDetail spot={s} owned />
                )}
            </div>
                </div>
        </div>
    )
}

export default UserSpots;
