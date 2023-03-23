const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, Reviewimage, Spotimage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 }, { max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
]

//Get All Spots
router.get('/', async (req, res, next) => {
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: Spotimage }
        ]
    });
    let spotsList = [];
    spots.forEach(spot => spotsList.push(spot.toJSON()))

    spotsList.forEach(spot => {
        let length = spot.Reviews.length;
        let totalStars = 0;

        spot.Reviews.forEach(review => totalStars += review.stars)

        !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars / length).toFixed(1)

        spot.Spotimages.forEach(image => spot.previewImage = image.url)

        delete spot.Reviews;
        delete spot.Spotimages;
    })

    return res.json({
        Spots: spotsList
    });
});

//Get Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    if (user) {
        const spots = await Spot.unscoped().findByPk(user.id, {
            include: [
                { model: Review },
                { model: Spotimage }
            ]
        });

        if (!spots) {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }

        let spotsList = [spots.toJSON()];

        spotsList.forEach(spot => {
            let length = spot.Reviews.length;
            let totalStars = 0;

            spot.Reviews.forEach(review => totalStars += review.stars)

            !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars / length).toFixed(1)

            spot.Spotimages.forEach(image => spot.previewImage = image.url)

            delete spot.Reviews;
            delete spot.Spotimages;
        })

        return res.json({
            Spots: spotsList
        });
    }

    return res.json({
        message: "Authentication required"
    })
});

//Get details of a spot from an id
router.get('/:spotId', async (req, res, next) => {

    const id = req.params.spotId;
    const spots = await Spot.unscoped().findByPk(id, {
        include: [
            { model: Review },
            { model: Spotimage },
            {
                model: User,
                attributes: [
                    'id',
                    'firstName',
                    'lastName'
                ]
            }
        ]
    });

    if (!spots) {
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err);
    }

    let spot = spots.toJSON();


    let length = spot.Reviews.length;
    let totalStars = 0;

    spot.Reviews.forEach(review => totalStars += review.stars)

    !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars / length).toFixed(1)

    spot.Owner = spot.User

    delete spot.Reviews
    delete spot.User

    return res.json(spot);
})


//Create a Spot
router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {

    const { user } = req;

    if (user) {

        console.log(user);
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const spot = await Spot.create({
            ownerId: user.dataValues.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        });

        return res.status(201).json(spot);

    }

    return res.json({
        message: "Authentication required"
    })
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const id = req.params.spotId;
    const { url, preview } = req.body;
    const { user } = req;

    if (user) {

        const spot = await Spot.findByPk(id);

        if (!spot) {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }
        // console.log(user);
        // console.log(spot);
        if (user.dataValues.id === spot.dataValues.ownerId) {

            const newImage = await spot.createSpotimage({
                url: url,
                preview: preview
            })

            return res.json({
                id: newImage.id,
                url: newImage.url,
                preview: newImage.preview
            });
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })
});

//Edit a Spot
router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res, next) => {
    const { user } = req
    const id = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (user) {

        const spot = await Spot.unscoped().findByPk(id);

        if (!spot) {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.dataValues.id === spot.dataValues.ownerId) {

            await spot.update({
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price
            })

            await spot.save();

            return res.json(spot);
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }
    return res.json({
        message: "Authentication required"
    })
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const id = req.params.spotId;

    const spot = await Spot.findByPk(id);

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err);
    }

    await spot.destroy();

    return res.json({
        "message": "Successfully deleted"
    });
});


module.exports = router;
