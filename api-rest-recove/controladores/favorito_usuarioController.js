const Favorito_usuario = require('../modelos/favoritos_usuarios')
const mongoose = require('mongoose')

function insertFavorito_usuario(req, res) {
    const fav_user = new Favorito_usuario(
        {
           idUsuario: req.user.sub,
           idPublicacion : req.body.idPublicacion,
        }
    )

    fav_user.save((err, data) => {
        if(err){console.log(err.errors); res.sendStatus(500)}
        else{
            res.status(200).send({favorito_usuario: data})
        }
    })
}

//para obtenerun solo registro recibiendo su id
function getFavorito_usuario(req, res) {
    Favorito_usuario.findById(req.params.idFavorito_usuario, (err, fav_user) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({fav_user})
        }
    })    
}

//obtener documentos por usuario:
function getFavorito_usuarioOfUser(req, res) { 
    Favorito_usuario.find({idUsuario: req.user.sub})
    .populate('idUsuario')
    .populate('idPublicacion')
    .exec((err, fav_user) => {
        if(err){throw err; res.status(500).send('error:' + err)}
        else{
            //res.status(200).send({fav_user})
            res.status(200).json(fav_user)
        }
    })   
}

//recuperamos todos los registros de favoritos_usuarios:
function getAllFavorito_usuario(req, res) {
    Favorito_usuario.find()
    .populate('idUsuario')
    .populate('idPublicacion')
    .exec((err, fav_user) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            //res.status(200).send({fav_user})
            res.status(200).json(fav_user)
        }
    })  
}

function updateFavorito_usuario(req, res) {
    let update = { nivelInteres  : req.body.nivelInteres }
    Favorito_usuario.findByIdAndUpdate(req.params.idFavorito_usuario, update ,(err, old) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({old})
        }
    })
}

function deleteFavorito_usuario(req, res) {
    Favorito_usuario.findByIdAndRemove(req.params.idFavorito_usuario, (err, deleted) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({deleted})
        }
    })
}

module.exports = {
    insertFavorito_usuario,
    getFavorito_usuario,
    getFavorito_usuarioOfUser,
    getAllFavorito_usuario,
    updateFavorito_usuario,
    deleteFavorito_usuario
}