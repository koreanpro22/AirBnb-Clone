import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar'>
      <div>
        <NavLink exact to="/">
          <i class="fa-sharp fa-solid fa-house">
            AirBnb-Clone
          </i>
        </NavLink>
      </div>
      {isLoaded && (
        <div className='right-nav'>
          {sessionUser && <NavLink to='/spots/new'>
              Create a New Spot
          </NavLink>}
          <ProfileButton user={sessionUser} />
        </div>
      )
      }
    </div>
  );
}

export default Navigation;
