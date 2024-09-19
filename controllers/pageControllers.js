const Photo = require('../models/Photo');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getEditPage = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id); // Veritabanından veriyi çekiyoruz
    if (!photo) {
      // Eğer photo bulunamazsa
      return res.status(404).send('Photo not found'); // 404 hatası döndür
    }
    res.render('edit', { photo }); // photo objesini şablona gönderiyoruz
  } catch (error) {
    console.error(error); // Hata detayını logla
    res.status(500).send('Internal Server Error'); // 500 hatası döndür
  }
};
