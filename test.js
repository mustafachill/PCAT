const ejs = require('ejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect to db
mongoose.connect('mongodb://localhost/pcat-test-db');

//create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create a photo
Photo.create({
  title: 'Photo title 2',
  description: 'Photo description 2',
});

//read a photo
Photo.find({})
  .then((photos) => {
    console.log(photos); // Fotoğrafları konsola yazdır
  })
  .catch((err) => {
    console.error('Hata:', err); // Hata durumunda hatayı konsola yazdır
  });
