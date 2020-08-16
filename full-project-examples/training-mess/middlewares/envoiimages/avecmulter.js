const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/stockage/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + path.basename(file.originalname, path.extname(file.originalname)) + path.extname(
      file.originalname))
  }
})

const desImagesUniqement = (req, file, cb) => {
  const autorise = /jpeg|jpg|png|gif/
  const extentionFichier = autorise.test(path.extname(file.originalname)
    .toLowerCase())
  const typeFichier = autorise.test(file.mimetype)

  if (extentionFichier && typeFichier) {
    return cb(null, true)
  }
  cb(new Error('ce format n\'est pas accepté, images uniquement'))
}

exports.receptionfichier = multer({ storage: storage, limits: { fileSize: 104857600 }, fileFilter: desImagesUniqement })
  .single('fichierPourLeServeur')
