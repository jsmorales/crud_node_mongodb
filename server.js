//https://zellwk.com/blog/crud-express-mongodb/
var express = require('express')
var bodyParser = require('body-parser')
var session = require('cookie-session')
var app = express()

//----------------------------------------------------
//obtiene las funciones para ejecutar en cada peticion
var frasesDAO = require('./DAO/frasesDAO.js')
//obtiene la conexion a la BD
//var conexion = conecta.getConexion();
//----------------------------------------------------

app.use(session({secret:'nodejs'}))
//para poder usar el render
app.set('view engine', 'ejs')
//app usea el boy parser para poder leer los atributos
//pasados por el form en post

app.use(bodyParser.urlencoded({extended:true}))
//app.use(express.bodyParser())
//app.use(express.methodOverride())
//----------------------------------------------------
//index
app.get('/', frasesDAO.index)

//crear una frase
app.post('/frases', frasesDAO.inserta)

//para consultar una frase
app.get('/show/:id', frasesDAO.ver_frase)

//carga en un formulario para posterior actualizar
app.get('/frase/:id/edita', frasesDAO.edita);

app.post('/frase/:id', frasesDAO.update);

app.get('/frase/:id/delete', frasesDAO.destroy);
//----------------------------------------------------
app.listen(3000, function(){
	console.log('May Node be with you')
})