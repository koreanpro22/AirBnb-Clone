import { useDispatch, useSelector } from 'react-redux';
import './UserSpots.css';
import { useHistory } from 'react-router';
import SingleSpotDetail from '../SingleSpotDetail';


function UserSpots() {

    const sessionUser = useSelector(state => state.session.user);
    const allSpotsObj = useSelector(state => state.spot.allSpots);
    const dispatch = useDispatch();
    const history = useHistory();

    const userSpots = Object.values(allSpotsObj).filter(s => {
        return s.ownerId === sessionUser.id
    })
    // console.log(allSpotsObj);
    console.log(userSpots);

    if (!sessionUser) {
        return history.push('/');
    }

    return (
        <div className='spot-gallery'>
            {userSpots.length > 0 && userSpots.map(s => <SingleSpotDetail spot={s} />
            )}
        </div>
    )
}

export default UserSpots;
