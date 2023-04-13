import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './ProfileButton.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button className="dropdown-button"onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-box">
            <p>{user.username}</p>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.email}</p>
            <p><NavLink to='/spots/owned'>Manage Spots</NavLink></p>
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </div>
        ) : (
          <div className="profile-box">
            <div>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
