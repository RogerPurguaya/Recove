'use strict'

const Categoria = require('../modelos/categoria')

function insertCategoria(req, res) {
    const categoria = new Categoria()
    categoria.nombre = req.body.nombre
    categoria.descripcion = req.body.descripcion

    categoria.save((err, saved) => {
        if(err) { throw err; res.sendStatus(500)}
        else{
            res.status(200).send({mensaje: 'Categoria guardada correctamente'})
        }
    })
}

function getCategoria(req, res) {
    Categoria.findById(req.params.idCategoria, (err, cat) => {
        if(err) {throw err ; res.sendStatus(500)}
        else{
            res.status(200).send({categoria: cat})
        }
    })
}

function getAllCategoria(req, res) {
    Categoria.find((err, data) => {
        if(err){throw err; res.sendStatus(500)}
        else{
            //res.status(200).send({categorias: data})
            res.status(200).json(data)
        } 
    })
}

function updateCategoria(req, res) {
    let update = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }

    Categoria.findByIdAndUpdate(req.params.idCategoria, update, (err, data) => {
        if(err) {throw err; res.sendStatus(500)}
        else{
            res.status(200).send({categoria: data})
        }
    })
}

function deleteCategoria(req, res) {
    Categoria.findByIdAndRemove(req.params.idCategoria, (err, data) => {
        if(err) {throw err; res.sendStatus(500)}
        else{
            res.status(200).send({respuesta : data})
        }
    })
}

module.exports = {
    insertCategoria,
    getCategoria,
    getAllCategoria,
    updateCategoria,
    deleteCategoria
}