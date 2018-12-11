'use strict'

//const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const jwt = require('jsonwebtoken')

//crear un token de autentificación:
function createToken(usuario) {
   /*  const sub = { 
        _id    : usuario._id,
        email  : usuario.email,
        nombre : usuario.nombre
    } */
    const payload = {
        sub: usuario._id,
    }

    return jwt.sign(payload, config.SECRET_TOKEN, {
        expiresIn: moment().add(10, 'days').unix()
    })
}

//decodificar token de usuario
function decodeToken(token) {
   return new Promise((resolve, reject ) => {
        jwt.verify(token, config.SECRET_TOKEN, (err, decoded) => {
            if (err) { reject({message: err.message, status: 401})}
            resolve(decoded)
        })
    })
}

//Método para parsear las rutas de las imágens subidas
function parseImagePath(path) {
  let parsedPath = path.split('\\')
  parsedPath[0] = config.DOMAIN_NAME
  return parsedPath.toString().replace(/,/g,'//')
}

//Método para obtener datos a exponer en el cliente (no sensibles)

function getCleanUser(user) {
    const { password, __v, _id , ...exposedData } = user
    return exposedData
}

module.exports = {
    createToken,
    decodeToken,
    parseImagePath,
    getCleanUser
}
