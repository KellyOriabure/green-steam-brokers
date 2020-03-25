const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
const currencyFormatter = require('currency-formatter');
const hbs = require('hbs')
const truncate = require('trunc-text')

console.log(typeof(currencyFormatter))

hbs.registerHelper('currencyFormatter', function (value) {
    return currencyFormatter.format(value, { code: 'NGN' })
})

hbs.registerHelper('truncate', function (value) {
    return truncate(value, 30)
})

const url = "http://swagger.homesdirect.ng/api/Listings"

request({url}, (error, response) => {
    const data = JSON.parse(response.body)

    router.get('/property', (req, res) => {
        res.render('property', {
            data: data.listings, 
        })
    })
    
})

router.get('/detail/:id', (req, res) => {
    console.log("ID: ", req.params.id);
    request(`${url}/${req.params.id}`, (error, response) => {
        const data = JSON.parse(response.body);
        res.render('detail', {data: data});
    });
});

module.exports = router