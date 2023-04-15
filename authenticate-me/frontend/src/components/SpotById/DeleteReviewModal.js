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
        <button onClick={deleteTrue}>Yes</button>
        <button onClick={deleteFalse}>No</button>
    </div>
    )
}

export default DeleteReviewModal;
