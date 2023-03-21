const express = require('express');
const { Op } = require('sequelize');

const { Spot, User, Booking, Review, Reviewimage, Spotimage } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
            },
            {
                model: Spotimage
            }
        ]
    });
    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    spotsList.forEach(spot => {
        let length = spot.Reviews.length;
        let totalStars = 0;

        spot.Reviews.forEach(review => totalStars += review.stars)

        !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars/length).toFixed(1)

        spot.Spotimages.forEach(image => spot.previewImage = image.url)

        delete spot.Reviews;
        delete spot.Spotimages;
    })

    return res.json({
        Spots: spotsList
    });
})

router.get('/current', async (req, res) => {

    const { user } = req;

    const spots = await Spot.unscoped().findByPk(user.id, {
        include: [
            {
                model: Review,
            },
            {
                model: Spotimage
            }
        ]
    });
    let spotsList = [spots.toJSON()];

    spotsList.forEach(spot => {
        let length = spot.Reviews.length;
        let totalStars = 0;

        spot.Reviews.forEach(review => totalStars += review.stars)

        !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars/length).toFixed(1)

        spot.Spotimages.forEach(image => spot.previewImage = image.url)

        delete spot.Reviews;
        delete spot.Spotimages;
    })

    return res.json({
        Spots: spotsList
    });
})




module.exports = router;
