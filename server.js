const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();



app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;           //using middleware
                                                                        
    console.log(log);
    fs.appendFile('server.log', log + '\n', err => {
        if(err) 
            console.log('Unable to append to the file');
    });
    next();
});
/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
    next();    //for website to work remove comment before next()
});*/

app.use(express.static(__dirname + '/public'));
/*
app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>');                 //basic way of doing things
});
*/
hbs.registerPartials(__dirname + '/views/partials'); //partials

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Title',
        welcomeMessage: 'Welcome to my website'
    })
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'            //basic way to do it
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',                                //templating engine
        message: 'Hello. My name is Inigo Montoya. You killed my father. Prepare to die.'
    });
});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();                //helpers in handlebars
});

hbs.registerHelper('screamIt', text => {
    return text.toUpperCase();
});


app.listen(3000, () => {
    console.log('Server is up for port 3000');
});