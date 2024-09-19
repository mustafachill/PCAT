const Photo = require('../models/Photo');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 2;

  const totalPhotos = await Photo.find().countDocuments();
  
  let pages = Math.ceil(totalPhotos / photosPerPage)

  console.log(pages)

  const photos = await Photo.find({})
  .sort('-dateCreated')
  .skip((page-1) * photosPerPage)
  .limit(photosPerPage)

  res.render('index', {
    photos: photos,
    current: page,
    pages: totalPhotos > 0 ? pages : 1
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = path.join(__dirname, '/..' , 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadImage = req.files.image;
  let uploadPath = path.join(uploadDir, uploadImage.name);

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).send('Photo not found');
    }

    // Veriyi güncelle
    photo.title = req.body.title;
    photo.description = req.body.description;
    await photo.save();

    // Güncelleme sonrası yönlendirme
    res.redirect(`/photos/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(req.params.id);
  res.redirect('/');
};
