'use strict'

const Conversacion = require('../modelos/conversacion')

function insertConversacion(req, res) {
    let conversacion = new Conversacion({
        participantes: req.body.participantes,
        estado: req.body.estado,
        mensajes: 
            {
                id_usuario: req.body.id_usuario,
                cuerpo: req.body.cuerpo,
                fecha: req.body.fecha
            }                                                                                                                                       
    })
    conversacion.save((err, conversacion) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({conversacion})
        }
    })
    
}

function getConversacion(req, res) {
    Conversacion.findById(req.params.idConversacion, (err, conversacion) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({conversacion})
        }
    })
}

function getAllConversacion(req, res) {
    Conversacion.find((err, conversaciones) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({conversaciones})
        }
    })
}

function updateConversacion(req, res) {
    let update = {
        participantes: req.body.participantes,
        estado : req.body.estado,
        fecha: req.body.fecha,
        mensajes: {
            id_usuario: req.body.id_usuario,
            cuerpo : req.body.cuerpo,
            fecha: req.body.fecha
        }
    }

    Conversacion.findByIdAndUpdate(req.params.idConversacion, update, (err, old) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({old})
        }
    })
}

function deleteConversacion(req, res) {
    Conversacion.findByIdAndRemove(req.params.idConversacion, (err, deleted) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            res.status(200).send({deleted})
        }
    })
}

module.exports = {
    insertConversacion,
    getConversacion,
    getAllConversacion,
    updateConversacion,
    deleteConversacion
}