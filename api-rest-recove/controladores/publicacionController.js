'use strict'
const service = require('../services/service')
const Publicacion = require('../modelos/publicacion')

function insertPublicacion(req, res) {
    let pathFile = service.parseImagePath(req.file.path) 
    const publicacion = new Publicacion(
        {
           ubicacion: {
               lat: req.body.lat,
               lng: req.body.lng
           },
           id_usuario : req.user.sub,
           descripcion: req.body.descripcion,
           tipo       : req.body.tipo,
           estado     : req.body.estado,
           categorias : req.body.categorias,
           imagen     : pathFile
        }
    )

    publicacion.save((err, data) => {
        if(err){console.log(err.errors); res.sendStatus(500)}
        else{
            res.status(200).send({publicacion: data})
        }
    })
}

function getPublicacion(req, res) {
    Publicacion.findById(req.params.idPublicacion, (err, publicacion) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({publicacion})
        }
    })    
}

//obtener publicaciones por usuario:
function getPublicacionOfUser(req, res) {
    Publicacion.find({id_usuario: req.user.sub})
    .populate({
        path: 'categorias', //nombre del campo en publicacion. 
        select: 'nombre' //campo q se selecciona
    })
    .exec((err, publicaciones) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            //res.status(200).send({publicaciones})
            res.status(200).json(publicaciones)
        }
    })    
}

//solo recuperamos las publicaciones disponibles
function getAllPublicacion(req, res) {

    Publicacion.find({estado:'disponible'})
    .populate({
        path: 'id_usuario', //nombre del campo en publicacion. 
        select: 'email' //campo q se selecciona
    })
    .populate({
        path: 'categorias', //nombre del campo en publicacion. 
        select: 'nombre' //campo q se selecciona
        })
    .exec((err, publicaciones) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            //res.status(200).send({publicaciones})
            res.status(200).json(publicaciones)
        }
    })
}

function updatePublicacion(req, res) {
    let update = {
    ubicacion: {
                 lat: req.body.lat,
                 lng: req.body.lng
               },
    descripcion : req.body.descripcion,
    tipo        : req.body.tipo,
    estado      : req.body.estado,
    categorias  : req.body.categorias
    }
    Publicacion.findByIdAndUpdate(req.params.idPublicacion, update ,(err, old) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({old})
        }
    })
}

function deletePublicacion(req, res) {
    Publicacion.findByIdAndRemove(req.params.idPublicacion, (err, deleted) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({deleted})
        }
    })
}

module.exports = {
    insertPublicacion,
    getPublicacion,
    getPublicacionOfUser,
    getAllPublicacion,
    updatePublicacion,
    deletePublicacion
}