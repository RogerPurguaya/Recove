'use strict'

const multer = require('multer')

//configuración de destino de imagen, y nombre del archivo almacenado:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
    
})

//Función de filtro de archivos (solo se admiten imágenes)
const fileFilter = (req, file, cb) => {
    let permitedExt = ['image/jpg','image/jpeg','image/png'];
    if (permitedExt.includes(file.mimetype)) {
        cb(null, true)
    }else{
        cb(new Error('Tipo de archivo no permitido.'), false)
    }
}

//Middleware upload:
const upload = multer({
    storage: storage,
     limits: {
        fileSize: 1024 * 1024 * 5 //máximo 5 MB.
    },
    fileFilter: fileFilter
})

module.exports = upload