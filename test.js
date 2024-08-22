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

//find a photo by id and update
async function updatePhotoById(photo_id) {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(photo_id, {
      title: "Photo update title 1",
      description: "blablabla"
    }, { new: true });  // Güncellenmiş dokümanı döndürmek için { new: true } kullanılır

    console.log("Güncellenen Fotoğraf:", updatedPhoto);
  } catch (err) {
    console.error('Hata:', err);
  }
}

const photo_id = '66c490658de3af7fdbbe8100';
updatePhotoById(photo_id);
