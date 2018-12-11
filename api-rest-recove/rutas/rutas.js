'use strict'

const express = require('express')
const usuarioController   = require('../controladores/usuarioController')
const categoriaController = require('../controladores/categoriaController')
const conversacionController = require('../controladores/conversacionController')
const publicacionController  = require('../controladores/publicacionController')
const favorito_usuarioController = require('../controladores/favorito_usuarioController')
const isAuth  = require('../middlewares/auth')
const upload  = require('../middlewares/upload')

const router = express.Router()

/* Rutas */

/* Rutas de usuarios */
    /* Rutas públicas */
    router.post('/signUp', usuarioController.signUp)
    router.post('/signIn', usuarioController.signIn)

    router.use(isAuth)
    /* Rutas de CRUD: */
    router.get('/usuarios/all', usuarioController.getAllUsuario)
    router.get('/usuarios', usuarioController.getUsuario)
    router.put('/usuarios',upload.single('avatar') ,usuarioController.updateUsuario)
    router.delete('/usuarios/:idUsuario', usuarioController.deleteUsuario)
    
    //ejemplo de ruta con middleware de autenticación JWT
    router.get('/private', isAuth , (req, res) => {
        res.status(200).send({user : req.user,message : 'si tienes acceso'})
    })

/* Rutas para categorias: */

router.get('/categorias', categoriaController.getAllCategoria)
router.get('/categorias/:idCategoria', categoriaController.getCategoria)
router.post('/categorias', categoriaController.insertCategoria)
router.put('/categorias/:idCategoria', categoriaController.updateCategoria)
router.delete('/categorias/:idCategoria', categoriaController.deleteCategoria)


/* Rutas para conversaciones: */

router.get('/conversaciones', conversacionController.getAllConversacion)
router.get('/conversaciones/:idConversacion', conversacionController.getConversacion)
router.post('/conversaciones', conversacionController.insertConversacion)
router.put('/conversaciones/:idConversacion', conversacionController.updateConversacion)
router.delete('/conversaciones/:idConversacion', conversacionController.deleteConversacion)

/* Rutas para publicaciones: */

router.get('/publicaciones', publicacionController.getAllPublicacion)
router.get('/publicaciones/:idPublicacion', publicacionController.getPublicacion)
router.get('/historial/usuario', publicacionController.getPublicacionOfUser)
router.post('/publicaciones', upload.single('imagen'), publicacionController.insertPublicacion)
router.put('/publicaciones/:idPublicacion', publicacionController.updatePublicacion)
router.delete('/publicaciones/:idPublicacion', publicacionController.deletePublicacion)

/* Rutas para Favoritos_usuarios: */

router.get('/favoritos', favorito_usuarioController.getAllFavorito_usuario)
router.get('/favoritos-user', favorito_usuarioController.getFavorito_usuarioOfUser)
router.get('/favoritos/:idFavorito_usuario', favorito_usuarioController.getFavorito_usuario)
router.post('/favoritos', favorito_usuarioController.insertFavorito_usuario)
router.put('/favoritos/:idFavorito_usuario', favorito_usuarioController.updateFavorito_usuario)
router.delete('/favoritos/:idFavorito_usuario', favorito_usuarioController.deleteFavorito_usuario)

module.exports = router