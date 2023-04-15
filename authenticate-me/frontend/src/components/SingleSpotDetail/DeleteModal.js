import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSpotThunk } from '../../store/spot';
import { useHistory } from 'react-router';

function DeleteModal({ spotId }) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteTrue = () => {
        dispatch(deleteSpotThunk(spotId))
        history.push('/spots/owned');
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

export default DeleteModal;
