'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const favoritos_usuariosSchema = Schema({
    idUsuario: {type: Schema.Types.ObjectId, required: true, ref: 'Usuario'},
    idPublicacion: {type: Schema.Types.ObjectId, required: true, ref: 'Publicacion'},
    nivelInteres : {type: String, enum: ['normal','alto'], default: 'normal'},
    fecha: {type: Date, default: Date.now() } 
})

module.exports = mongoose.model('Favorito_usuario', favoritos_usuariosSchema,'Favoritos_usuarios')