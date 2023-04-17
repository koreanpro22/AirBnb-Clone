import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UpdateSpotForm.css';
import { useHistory, useParams } from "react-router";
import { updateSpotThunk } from "../../store/spot";
import { getSpotsThunk, getSpotByIdThunk } from '../../store/spot';


function UpdateSpotForm() {
    // console.log('Update form reached!')
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const currSpot = useSelector(state => state.spot.singleSpot);

    // console.log('current spot', currSpot)
    // useEffect(() => {
    //     dispatch(getSpotsThunk());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(getSpotByIdThunk(id))
    }, [dispatch, id]);

    const [country, setCountry] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setCountry(currSpot?.country);
        setAddress(currSpot?.address);
        setCity(currSpot?.city);
        setState(currSpot?.state);
        setDescription(currSpot?.description);
        setTitle(currSpot?.name);
        setPrice(currSpot?.price);
    }, [currSpot])

    if (!currSpot) {
        return null
    }



    if (!sessionUser) {
        history.push('/');
        // alert('You must be logged in!');
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        // const spot = {
        //     id,
        //     address,
        //     city,
        //     state,
        //     country,
        //     lat: 1,
        //     lng: 1,
        //     name: title,
        //     description,
        //     price
        // }

        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (!country) errors.country = 'country is required';
        if (!title) errors.title = 'Name is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!(+price)) errors.price = 'Price must be valid integer'
        if (!price) errors.price = 'Price is required';



        if (!Object.values(errors).length) {

            await dispatch(updateSpotThunk({
                id,
                address,
                city,
                state,
                country,
                lat: 1,
                lng: 1,
                name: title,
                description,
                price
            }))
            history.push(`/spots/${id}`)
        }
        setErrors(errors);

    };


    // console.log('Form loading')


    return (
        <div className="form">
            <div className="create-spot-form-page">
                <h1 className="create-spot-title">Update Spot</h1>
                <form onSubmit={handleSubmit} className="create-spot-form">
                    <div className="geographic-location">
                        <label>Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country"

                        />
                        {errors.country && <p className="error-text">{errors.country}</p>}

                        <label>Street Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"

                        />
                        {errors.address && <p className="error-text">{errors.address}</p>}
                        <div className="city-state-form">
                            <div className="city-box">
                                <label>City: </label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"

                                />
                            </div>
                            {errors.city && <p className="error-text">{errors.city}</p>}
                            <div className="state-box">
                                <label>State: </label>
                                <input
                                    type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    placeholder="State"

                                />
                                {errors.state && <p className="error-text">{errors.state}</p>}
                            </div>
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
                            cols='50'
                        >
                        </textarea>
                        {errors.description && <p className="error-text">{errors.description}</p>}
                    </div>
                    <div>
                        <h4>Create a title for your spot</h4>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                        <input
                            className="title-input"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Name of your spot"

                        />
                        {errors.title && <p className="error-text">{errors.title}</p>}
                    </div>
                    <div>
                        <h4>Set a base price for your spot</h4>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <input
                            className="price-input"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price per night (USD)"

                        />
                        {errors.price && <p className="error-text">{errors.price}</p>}
                    </div>
                    <button type="submit" className="submit-spot-form-button">Update Spot</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateSpotForm
