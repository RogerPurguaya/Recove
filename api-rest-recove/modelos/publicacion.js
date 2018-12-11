'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publicacionSchema = Schema({
    ubicacion : 
    {
      lat:  {type: Number, required: true},
      lng: {type: Number, required: true}
    },
    id_usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    descripcion : {type:String, default: 'Sin descripción disponible'},
    fecha : {type: Date, default: Date.now()},
    tipo: { type: String , enum: ['venta','gratis']},
    estado: { type: String , enum: ['disponible','agotado'], default: 'disponible'},
    categorias : [{type: Schema.Types.ObjectId, ref: 'Categoria'}],
    imagen: {type: String, default: 'not found'}
})


/* var validator = function (value) {
    console.log('la vecindad del chavo')
    return true
}

publicacionSchema.path('tipo').validate(validator,'no es el tipo correcto','color inválido') */

publicacionSchema.path('tipo').validate(function(value) {
    if (value !== 'venta' && value !== 'gratis') {   
      return false
    }
    return true;
  },'El tipo de publicación no es válido');

module.exports = mongoose.model('Publicacion', publicacionSchema,'Publicaciones')