//  middleware/multer.js
const multer = require('multer')
const upload = multer({
  dest: 'temp/',
  limit: {
    fileSize: 1000000
  },
  fileFilter (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      cb(new Error('Please upload an image'))
    }
    cb(null, true)
  }
})

module.exports = upload
