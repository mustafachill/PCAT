const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const Photo = require('./models/Photo');
const photoController = require("./controllers/photoControllers")
const pageController = require("./controllers/pageControllers")


const app = express();

//connect to database
mongoose.connect('mongodb://localhost/pcat-db');

app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

////////////////////
//////ROUTES////////
////////////////////

// GET ALL PHOTOS
app.get('/', photoController.getAllPhotos);
// PHOTO DESCRIPTON
app.get('/photos/:id', photoController.getPhoto);
// POST AND SAVE
app.post('/photos', photoController.createPhoto);
// UPDATE PHOTO INFO
app.put('/photos/:id', photoController.updatePhoto);
// DELETE PHOTO
app.delete('/photos/:id', photoController.deletePhoto);

// ABOUT PAGE
app.get('/about', pageController.getAboutPage);
// ADD PHOTO PAGE
app.get('/add', pageController.getAddPage);
// EDIT PHOTO PAGE
app.get('/photos/edit/:id', pageController.getEditPage);

// PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} başlatıldı...`);
});
