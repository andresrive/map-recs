const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINATY_KEY,
    api_secret: process.env.CLOUDINATY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        allowed_formats: ['jpg', 'png', 'jpeg'],
        folder: 'map-recs',
        size: 10000000
    }
})

module.exports = (multer({storage}));
