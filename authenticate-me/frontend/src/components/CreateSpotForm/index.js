import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateSpotForm.css';
import { useHistory } from "react-router";
import { createSpotThunk } from "../../store/spot";
import { getSpotsThunk } from '../../store/spot';


function CreateSpotForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [errors, setErrors] = useState({});
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");

    // const { closeModal } = useModal();

    const sessionUser = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spot.singleSpot);

    useEffect(() => {
        dispatch(getSpotsThunk());
    }, [dispatch]);

    useEffect(() => {
        setErrors({})
    }, [dispatch])


    if (!sessionUser) {
        history.push('/');
        // alert('You must be logged in!');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!country) errors.country = 'Country is required';
        if (!title) errors.title = 'Name is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!(+price)) errors.price = 'Price must be valid integer'
        if (!price) errors.price = 'Price is required';
        if (!previewImage) errors.prevImg = 'Preview Image is required';

        if (!Object.values(errors).length) {

            dispatch(createSpotThunk({
                address,
                city,
                state,
                country,
                lat: 1,
                lng: 1,
                name: title,
                description,
                price
            })).then((res) => history.push(`/spots/${res.id}`))
        }
        setErrors(errors)

    };

    return (
        <div className="form">
            <div className="create-spot-form-page">
                <h1 className="create-spot-title">Create a Spot</h1>
                <form onSubmit={handleSubmit} className="create-spot-form">
                    <div className="geographic-location">
                        <div>
                            <h4>Where's your place located?</h4>
                            Guests will only get your exact address once they booked a
                            reservation.
                        </div>

                        <label>Country:
                            {errors.country && <span className="error-text">{errors.country}</span>}
                        </label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"

                        />
                        <label>Street Address:
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        />

                        <div className="city-state-form">
                            <div className="city-box">
                                <label>City:
                                    {errors.city && <span className="error-text">{errors.city}</span>}
                                </label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"

                                />
                            </div>
                            <div className="state-box">

                                <label>State: 
                                    {errors.state && <span className="error-text">{errors.state}</span>}
                                </label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="State"

                                />
                            </div>
                        </div>

                    </div>
                    <div className="border"></div>
                    <div>
                        <h4>Describe your place to guests</h4>
                        <p>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.</p>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="PLease wrtite at least 30 characters"
                            rows='5'
                            cols='42'
                        >
                        </textarea>
                        {errors.description && <span className="error-text">{errors.description}</span>}
                    </div>
                    <div className="border"></div>
                    <div className="spot-title">
                        <h4>Create a title for your spot</h4>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Name of your spot"

                        />

                        {errors.title && <p className="error-text">{errors.title}</p>}
                    </div>
                    <div className="border"></div>
                    <div>
                        <h4>Set a base price for your spot</h4>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        $ <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"

                        />
                        {errors.price && <p className="error-text">{errors.price}</p>}
                    </div>
                    <div className="border"></div>
                    <div>
                        <h4>Liven up your spot with photos</h4>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <div className="image-inputs">
                            <input
                                type="text"
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                                placeholder="Preview Image Url"
                            />
                            {errors.prevImg && <span className="error-text">{errors.prevImg}</span>}
                            <input
                                type="text"
                                value={img1}
                                onChange={(e) => setImg1(e.target.value)}
                                placeholder="Image Url"
                            />
                            {/* {errors.prevImg && <p className="error-text">{errors.prevImg}</p>} */}
                            <input
                                type="text"
                                value={img2}
                                onChange={(e) => setImg2(e.target.value)}
                                placeholder="Image Url"
                            />
                            {/* {errors.prevImg && <p className="error-text">{errors.prevImg}</p>} */}
                            <input
                                type="text"
                                value={img3}
                                onChange={(e) => setImg3(e.target.value)}
                                placeholder="Image Url"
                            />
                            {/* {errors.prevImg && <p className="error-text">{errors.prevImg}</p>} */}
                            <input
                                type="text"
                                value={img4}
                                onChange={(e) => setImg4(e.target.value)}
                                placeholder="Image Url"
                            />
                            {/* {errors.prevImg && <p className="error-text">{errors.prevImg}</p>} */}
                        </div>
                    </div>
                    <button type="submit" className="submit-spot-form-button">Create Spot</button>
                </form>
            </div>

        </div>
    );
}

export default CreateSpotForm
