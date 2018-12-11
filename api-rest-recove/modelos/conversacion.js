'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mensajeSchema = Schema({
    id_usuario: {type: Schema.Types.ObjectId , ref: 'Usuarios'},
    cuerpo: {type: String, min: 1, max: 255},
    fecha : {type: Date, default: Date.now()}
})

const conversacionSchema = Schema({
    participantes : [{type: Schema.Types.ObjectId, ref: 'Usuarios'}],
    estado : {type: String, enum: ['activo','caduco']},
    fecha : {type: Date, default: Date.now()},
    mensajes : [mensajeSchema]
})

module.exports = mongoose.model('Conversacion', conversacionSchema,'Conversaciones')