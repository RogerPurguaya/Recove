'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoriasSchema = Schema({
    nombre: {type: String, min: 1, max: 30, required: true},
    descripcion: {type: String, default: 'Sin descripcion disponible'}
})

module.exports = mongoose.model('Categoria', categoriasSchema,'Categorias')