'use strict'
//imports 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const hbs = require('express-handlebars')
const router = require('./rutas/rutas')
const path = require('path')
//habilitamos CORS para aceptar peticiones de cualquier dominio.
//solo usar en ambientes de desarrollo*
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const cors = require('cors')
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
})); 
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>

app.use(express.static('public'));

//parsea el cuerpo de las peticiones HTTP:
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname : '.hbs'
}))

app.set('view engine','.hbs')

app.get('/', (req, res) => {
	res.render('index')
})

//integra las rutas?
app.use('/api',router)

module.exports = app
    
