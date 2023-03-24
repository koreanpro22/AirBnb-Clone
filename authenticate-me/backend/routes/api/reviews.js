const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, Reviewimage, Spotimage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const checkingReview = [

]


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    if (user) {

        const reviews = await Review.unscoped().findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: {
                        exclude: ['description', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: Reviewimage,
                    attributes: ['id', 'url']
                }
            ]
        });

        if (!reviews) {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }


        const reviewsList = []

        reviews.forEach(review => {
            reviewsList.push(review.toJSON());
        });

        for (let reviews of reviewsList) {
            reviews.Reviewimages.forEach(imageObj => {
                if (imageObj.preview) {
                    reviews.Spot.previewImage = imageObj.url
                }
            })
            if (!reviews.Spot.previewImage) {
                reviews.Spot.previewImage = null
            }
        }

        return res.json({
            Reviews: reviewsList
        });
    }

    return res.json({
        message: "Authentication required"
    })
})



router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const id = req.params.reviewId;
    const { user } = req;

    if (user) {

        const reviewObj = await Review.findByPk(id);

        if (!reviewObj) {
            const err = new Error("Review couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.id === reviewObj.userId) {

            const { url } = req.body;

            const image = await reviewObj.createReviewimage({
                url: url
            })

            return res.json({
                id: image.dataValues.id,
                url: image.dataValues.url
            })
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })
})


router.put('/:reviewId', requireAuth, async (req, res, next) => {

    const id = req.params.reviewId;
    const { user } = req;

    if (user) {

        const reviewObj = await Review.unscoped().findByPk(id);

        if (!reviewObj) {
            const err = new Error("Review couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.id === reviewObj.userId) {

            const { review, stars } = req.body;

            await reviewObj.update({
                review: review,
                stars: stars
            })

            return res.json(reviewObj);
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })

})


router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const id = req.params.reviewId;
    const { user } = req;

    if (user) {

        const reviewObj = await Review.unscoped().findByPk(id);

        if (!reviewObj) {
            const err = new Error("Review couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.id === reviewObj.userId) {

            await reviewObj.destroy();

            return res.json({
                "message": "Successfully deleted"
              });
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })

})



module.exports = router;
