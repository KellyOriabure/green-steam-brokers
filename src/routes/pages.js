const express = require('express');
const router = express.Router();
const request = require('request');
session = require('express-session');

const apiUrl = "http://swagger.homesdirect.ng/api";

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    req.session.user = {};
    if (req.session.user.isAuthenticated){
        console.log(req.session.isAuthenticated);
    }
    request.post({
        url: `${apiUrl}/User/Authenticate`,
        headers: {
            "Content-Type": "application/json",
        },
        json: true,
        body: {
            "email": req.body.email,
            "password": req.body.password
        }
    },
    (error, response, body) => {
        console.log("Response: ", JSON.stringify(response, null, 4));
        console.log("Body: ", JSON.stringify(body, null, 4));
        if (body.status === true) {
            req.session.user = body.user;
            req.session.user.isAuthenticated = true;
            res.redirect('/user/profile');
        }
        res.render('login');
    });
});

router.get('/signup', (req, res) => {
    res.render('register');
})

router.post('/signup', (req, res) => {
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let email = req.body.email;
    let phone = req.body.phone;

    request.post({
        url: `${apiUrl}/User`,
        headers: {
            "Content-Type": "application/json",
        },
        json: true,
        body: {
            "firstname": firstname,
            "lastname": lastname,
            "password": password,
            "email": email,
            "phone": phone
        }
    },
    (error, response, body) => {
        console.log(response);
        console.log(body);
        if (body.status === true) {
            res.redirect('/login');
        }
        res.render('register');
    });
});

router.get('/about', (req, res) => {
    res.render('about')
})

router.get('/services', (req, res) => {
    res.render('services')
})


router.get('/lenders', (req, res) => {
res.render('Lenders')
})

router.get('/calculator', (req, res) => {
    res.render('calculator')
})

router.get('/afdcalculator', (req, res) => {
    res.render('afdcalculator')
})

router.get('/mortgage-application', (req, res) => {
    res.render('mtg_application')
})


router.get('/user/profile', (req, res) => {
    user = req.session.user
    res.render('profile', {user: user, title:user.firstName })
   
})

module.exports = router
