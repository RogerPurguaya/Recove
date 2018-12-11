'use strict'

const mongoose = require('mongoose')
const Usuario = require('../modelos/usuario')
const { getCleanUser, parseImagePath, createToken } = require('../services/service')

function getUsuario(req, res) {
    Usuario.findById(req.user.sub, (err, usuario) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({usuario})
        }
    })
}

function getAllUsuario(req, res) {
    Usuario.find((err, usuarios) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({usuarios})
        }
    })
}

function updateUsuario(req, res) {
    let update = {
        ...req.body
    }
    if (req.file) {
        update.avatar = parseImagePath(req.file.path)     
    }

    Usuario.findByIdAndUpdate(req.user.sub , update,(err,old) => {
        if(err){throw err; res.status(500).send(`Error interno: ${err}`)}
        else{
            res.status(200).send({old: getCleanUser(old._doc)})
        }
    }) 
}

function deleteUsuario(req, res) {
    Usuario.findByIdAndRemove(req.user.sub, (err, deleted) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({deleted: deleted._doc})
        }
    })
}

//Función para registro de usuario:

function signUp(req, res) { 

    const usuario = new Usuario({
        ...req.body
    })
    
    //asignamos el gravatar:
    usuario.avatar = usuario.gravatar()
    
    usuario.save( (err, user) => {
        if(err) return res.status(500).send('Error al crear el usuario '+ err)
        user = user._doc
        return res.status(201).send({ 
            token: createToken(user),
            usuario: getCleanUser(user), //devolvemos un user sin campos sensibles
            mensaje: 'Usuario creado correctamente!'  
        })
    })   
}

//Función para  acceso y validación de usuario:

function signIn(req, res) {
    let query = Usuario.findOne({email: req.body.email})
    query.select('_id email password nombre celular direccion avatar calificacion')
    query.exec((err, user) => {
        if(err) return res.status(500).send(err)
        if(!user) return res.status(403).send('Usuario no encontrado')

        user.comparePassword(req.body.password, user.password, (err,isMatch) => {
        if(err) {return res.status(500).send({mensaje:'Error Interno'})}
        if(!isMatch){return res.status(403).send({mensaje:'Credenciales incorrectas'})}
        
        user = user._doc // limpiamos los metadatos
        req.user = user //para usar en caso de ser un middleware?
        return res.status(200).send({
                    mensaje: 'Te has loggeado correctamente.',
                    usuario: getCleanUser(user),
                    token: createToken(user)
                })
        })
    }) 
}

module.exports = {
    signUp,
    getUsuario,
    getAllUsuario,
    updateUsuario,
    deleteUsuario,
    signIn
}