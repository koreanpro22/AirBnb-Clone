import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UpdateSpotForm.css';
import { useHistory, useParams } from "react-router";
import { updateSpotThunk } from "../../store/spot";
import { getSpotsThunk, getSpotByIdThunk } from '../../store/spot';


function UpdateSpotForm() {
    console.log('Update form reached!')
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const currSpot = useSelector(state => state.spot.singleSpot);
    
    console.log('current spot', currSpot)
    useEffect(() => {
        dispatch(getSpotsThunk());
    }, [dispatch]);

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
        const spot = {
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
        }

        const res = await dispatch(updateSpotThunk(spot))
        history.push(`/spots/${id}`)
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) {
        //       setErrors(data.errors);
        //     }
        //   });

    };

    console.log('Form loading')


    return (
        <div className="update-spot-form-page">
            <h1>Update Spot</h1>
            <form onSubmit={handleSubmit} className="update-spot-form">
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
                <button type="submit">Update Spot</button>
            </form>
        </div>
    );
}

export default UpdateSpotForm
