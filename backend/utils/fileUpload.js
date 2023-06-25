const multer = require("multer")
const fs=  require('fs')
const path = require("path")
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "public/uploads"
    if(!fs.existsSync(dest))
    {
      fs.mkdirSync(dest,{recursive:true})
    }
      cb(null, dest )
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    let fname = path.basename(file.originalname,ext)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, fname  + uniqueSuffix + ext)
  }
})
function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      cb(null, true)
  } else {
      cb(null, false)
  }
  cb(new Error('I don\'t have a clue!'))
}

var upload = multer({
  storage: storage,
  limits: {
      fieldSize: 1024 * 1024 * 5,
      fileFilter: fileFilter
  }
})

module.exports = upload