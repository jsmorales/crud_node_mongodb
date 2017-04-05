//https://zellwk.com/blog/crud-express-mongodb/
var express = require('express')
var bodyParser = require('body-parser')
var session = require('cookie-session')
var app = express()

//----------------------------------------------------
var conecta = require('./conexion/conexion_sql.js')
//obtiene la conexion a la BD
var conexion = conecta.getConexion();
//----------------------------------------------------
/*
Esto esta escrito en ES6
*/
app.use(session({secret:'nodejs'}))
//para poder usar el render
app.set('view engine', 'ejs')
//app usea el boy parser para poder leer los atributos
//pasados por el form en post
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (llamado, respuesta) => {
	//respuesta.sendFile(__dirname+'/index.html')
	//respuesta.send('NODEMON es increíble pero NODE es más.')
	
	var query_select = "select * from frases";

	conexion.query(query_select, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res.length > 0 ? res : [{"resultado":"No se encontraron resultados."}];			
		}
		
		console.log(resultado)

		respuesta.render('index.ejs', {'frases': resultado})

		//conexion.end()
	})

})

app.post('/frases', (llamado, respuesta) => {
	
	console.log(llamado.body);
	//INSERT INTO `frases` (`pkID`, `nombre`, `frase`) VALUES (NULL, 'yoda', 'master')
	var query_insert = "INSERT INTO `frases` (`pkID`, `nombre`, `frase`) VALUES (NULL, '"+llamado.body.nombre+"', '"+llamado.body.frase+"')";	

	conexion.query(query_insert, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res;			
		}
		
		console.log(resultado)

		respuesta.redirect('/')

		//conexion.end()
	})
})

app.get('/show/:id', function(llamado, respuesta){
	
	//console.log(llamado.params)

	var query_select_f = "select * from frases where pkID = "+ llamado.params.id;

	conexion.query(query_select_f, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res.length > 0 ? res : [{"resultado":"No se encontraron resultados."}];	;			
		}
		
		console.log(resultado)

		respuesta.render('show_frase.ejs', {'frase': resultado[0]})

		//conexion.end()
	})

})

app.listen(3000, function(){
	console.log('May Node be with you')
})

