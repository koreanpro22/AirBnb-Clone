import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { createReviewThunk, getReviewsBySpotIdThunk } from "../../store/review";
import { useHistory } from 'react-router';
import { useState } from "react";
import { getSpotByIdThunk } from "../../store/spot";


function CreateReviewModal({ spotId }) {

  const [review, setReview] = useState("");
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
    <div className="create-review">
      <h2>How was your stay?</h2>
      <form onSubmit={handleSubmit} className="create-review-form">
        <label className="review">
          {/* Review: <span> </span> */}
          <textarea
            type="text"
            rows={7}
            cols={31}

            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <label className="stars">
          {/* <input
            type="text"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
            /> */}
            {stars > 0 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(1)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(1)}></i>
            }
            {stars > 1 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(2)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(2)}></i>
            }
            {stars > 2 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(3)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(3)}></i>
            }
            {stars > 3 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(4)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(4)}></i>
            }
            {stars > 4 ?
            <i class="fa-sharp fa-solid fa-star" onClick={() => setStars(5)}></i>
            :
            <i class="fa-sharp fa-regular fa-star" onClick={() => setStars(5)}></i>
            }
            <span></span> Stars
        </label>
        {/* {errors.stars && (<p className="error-text">{errors.stars}</p>)} */}
        <button className='create-review-button' type="submit" disabled={(review.length < 10) || !stars}>Submit Your Review</button>
      </form>
    </div>
  )
}

export default CreateReviewModal;
