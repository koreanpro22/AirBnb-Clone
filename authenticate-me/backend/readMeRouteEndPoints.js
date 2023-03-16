const { Router } = require("express");

Router.use();

router.get('/user/login', (req, res, next) => {
    //checks for correct user credentials

    //redirect to homepage logged in
    res.status(302);
    res.json()
})

router.post('/user', (req, res, next) => {
    const { firstName, lastName, email, username, password } = req.body;

    // Table.create({
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     username: username,
    //     password: password
    // });
})
