import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

const imageUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'caroussel1', maxCount: 1 },
  { name: 'caroussel2', maxCount: 1 },
  { name: 'caroussel3', maxCount: 1 }
]);

export default imageUpload;
