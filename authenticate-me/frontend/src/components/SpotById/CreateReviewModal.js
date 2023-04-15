import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk, getReviewsBySpotIdThunk } from "../../store/review";
import { useHistory } from 'react-router';
import { useState } from "react";
import { getSpotByIdThunk } from "../../store/spot";


function CreateReviewModal({ spotId }) {

  const [review, setReview] = useState();
  const [stars, setStars] = useState();

  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
    }

    await dispatch(createReviewThunk(newReview, spotId))
    await dispatch(getSpotByIdThunk(spotId));
    await dispatch(getReviewsBySpotIdThunk(spotId));
    history.push(`/spots/${spotId}`);
    closeModal();
  }



  return (
    <div>
      <h2>Post Your Review</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="review">
          Review: <span> </span>
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label className="stars">
          Stars: <span> </span>
          <input
            type="text"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        {/* {errors.stars && (<p className="error-text">{errors.stars}</p>)} */}
        <button className='login-button' type="submit">Post Review</button>
      </form>
    </div>
  )
}

export default CreateReviewModal;
