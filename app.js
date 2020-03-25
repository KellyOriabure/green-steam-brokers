const express = require('express');
const app = express();
const path = require("path");
const hbs = require('hbs');
const bodyParser = require('body-parser');
const apiRoutes = require('./src/routes/api');
const pagesRoutes = require('./src/routes/pages');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'sessionSecretCode',
    cookie:{
        maxAge : 1000 * 60 * 60 * 2
    }
}));
app.use(express.static(path.join(__dirname, './public')))
app.set("view engine", "hbs")
const viewspath = path.join(__dirname, './templates/views')
const patialspath =  path.join(__dirname, './templates/partials')


app.set('views', viewspath)
hbs.registerPartials(patialspath)

app.get('', (req, res) => {
    res.render('index')
})

app.use('/', pagesRoutes)
app.use('/', apiRoutes)




const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("listening on port 3000")
})