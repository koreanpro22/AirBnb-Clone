import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className={
      errors.confirmPassword ? "confirm-password-error" :
      Object.values(errors).length === 1 ? "signup-page-one-error":
      Object.values(errors).length === 2 ? "signup-page-two-error":
      Object.values(errors).length === 3 ? "signup-page-three-error": "signup-page"
      }>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label> Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <div className="error-text">{errors.email}</div>}
        <label> Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {errors.username && <div className="error-text">{errors.username}</div>}
        <label> First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <div className="error-text">{errors.firstName}</div>}
        <label> Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <div className="error-text">{errors.lastName}</div>}
        <label> Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <div className="error-text">{errors.password}</div>}
        <label> Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {errors.confirmPassword && (
          <div className="error-text">{errors.confirmPassword}</div>
        )}
        <button type="submit" className="signup-button" disabled={(!email || username.length < 4 || !firstName || !lastName || password.length < 6 || !confirmPassword)}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
