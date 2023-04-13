import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: 'test1', password: 'password1'}))
    .then(closeModal);
  }

  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="username">
          Username or Email: <span> </span>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label className="password">
          Password: <span> </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p className="error-text">{errors.credential}</p>
        )}
        <button className='login-button' type="submit">Log In</button>
      </form>
      <button className="demo-button" onClick={demoUser}>Demo User</button>
    </div>
  );
}

export default LoginFormModal;
