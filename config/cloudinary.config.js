const multer = require("multer");
const cloudinary = require("cloudinary").v2;
<<<<<<< HEAD
const {CloudinaryStorage} = require("multer-storage-cloudinary");
=======
const { CloudinaryStorage } = require("multer-storage-cloudinary");
>>>>>>> andres

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
<<<<<<< HEAD
        //size: 10000000
=======
        // size: 10000000
>>>>>>> andres
    }
})

module.exports = multer({ storage })