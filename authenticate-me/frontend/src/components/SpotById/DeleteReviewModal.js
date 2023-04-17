import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/review";
import { useHistory } from 'react-router';
import './DeleteReviewModal.css';

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
        <div className="delete-review">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="yes-no-button">
                <button onClick={deleteTrue} className="delete-review-button">Yes (Delete Review)</button>
                <button onClick={deleteFalse} className="no-delete-review-button">No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;
