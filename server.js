//https://zellwk.com/blog/crud-express-mongodb/
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

/*
Esto esta escrito en ES6
*/
//app usea el boy parser para poder leer los atributos
//pasados por el form en post
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (llamado, respuesta) => {
	respuesta.sendFile(__dirname+'/index.html')
	//respuesta.send('NODEMON es increíble pero NODE es más.')
})

app.post('/frases', (llamado, respuesta) => {
	console.log(llamado.body);	
})

app.listen(3000, function(){
	console.log('May Node be with you')
})

