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
        <NavLink
        exact to="/"
        style={() => {
          return {
            color: "black",
            textDecoration: "none"
          }
        }}
        >
          <i class="fa-sharp fa-solid fa-house">
            SkyBnb
          </i>
        </NavLink>
      </div>
      {isLoaded && (
        <div className='right-nav'>
          {sessionUser &&
            <NavLink
              to='/spots/new'
              style={() => {
                return {
                  color: "black",
                  textDecoration: "none"
                }
              }}>
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
