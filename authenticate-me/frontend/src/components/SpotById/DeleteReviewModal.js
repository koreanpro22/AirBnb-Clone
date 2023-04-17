import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/review";
import { useHistory } from 'react-router';

function DeleteReviewModal({ reviewId, spotId }) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteTrue = () => {
        dispatch(deleteReviewThunk(reviewId))
        history.push(`/spots/${spotId}`);
        closeModal();
    }

    const deleteFalse = () => {
        closeModal();
    }



    return (
    <div>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <button onClick={deleteTrue} className="delete-review-button">Yes</button>
        <button onClick={deleteFalse} className="no-delete-review-button">No</button>
    </div>
    )
}

export default DeleteReviewModal;
