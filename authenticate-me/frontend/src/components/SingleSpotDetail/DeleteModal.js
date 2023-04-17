import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from '../../store/spot';
import { useHistory } from 'react-router';
import { getReviewsBySpotIdThunk } from "../../store/review";

function DeleteModal({ spotId }) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteTrue = async () => {
        await dispatch(deleteSpotThunk(spotId))
        await dispatch(getReviewsBySpotIdThunk(spotId))
        history.push('/spots/owned');
        closeModal();
    }

    const deleteFalse = () => {
        closeModal();
    }



    return (
        <div className="delete-spot-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this spot?</p>
            <div className="delete-spot-buttons">
                <button onClick={deleteTrue} className="delete-spot-button">Yes (Delete Spot)</button>
                <button onClick={deleteFalse} className="no-delete-spot-button">No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteModal;
