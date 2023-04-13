import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CreateSpotForm.css';
import { useHistory } from "react-router";
import { createSpotThunk } from "../../store/spot";


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
    // const { closeModal } = useModal();

    const sessionUser = useSelector(state => state.session.user);
    const currentSpot = useSelector(state => state.spot.singleSpot);

    if (!sessionUser) {
        history.push('/');
        // alert('You must be logged in!');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const spot = {
            address,
            city,
            state,
            country,
            lat: 1,
            lng: 1,
            name: title,
            description,
            price
        }

        dispatch(createSpotThunk(spot))
        console.log('current spot', currentSpot)
        history.push(`/spots/${currentSpot.id}`)
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) {
        //       setErrors(data.errors);
        //     }
        //   });

    };

    return (
        <div className="create-spot-form-page">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} className="create-spot-form">
                <div>
                    <div>
                        <label>Country</label> <br></br>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"
                            required
                        />
                        {errors.country && <p className="error-text">{errors.country}</p>}
                    </div>
                    <div>

                        <label>Street Address:</label> <br></br>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                            required
                        />
                        {errors.address && <p className="error-text">{errors.address}</p>}
                    </div>
                    <div>
                        <p>

                            <label>City</label> <br></br>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="City"
                                required
                            />
                            {errors.city && <p className="error-text">{errors.city}</p>}
                        </p>
                        <p>

                            <label>State</label> <br></br>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="State"
                                required
                            />
                            {errors.state && <p className="error-text">{errors.state}</p>}
                        </p>
                    </div>
                </div>
                <div>
                    <h4>Describe your place to guests</h4>
                    <p>Mention the best features of your space, any special amentities like fast wif or parking, and what you love about the neighborhood.</p>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="PLease wrtite at least 30 characters"
                        rows='5'
                        cols='40'
                    >
                    </textarea>
                    {errors.description && <p className="error-text">{errors.description}</p>}
                </div>
                <div>
                    <h4>Create a title for your spot</h4>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Name of your spot"
                        required
                    />

                    {errors.title && <p className="error-text">{errors.title}</p>}
                </div>
                <div>
                    <h4>Set a base price for your spot</h4>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"
                        required
                    />
                    {errors.title && <p className="error-text">{errors.title}</p>}
                </div>
                <div>
                    <h4>Liven up your spot with photos</h4>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        type="text"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        placeholder="Preview Image Url"
                        required
                    />
                    {errors.title && <p className="error-text">{errors.title}</p>}
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
}

export default CreateSpotForm
