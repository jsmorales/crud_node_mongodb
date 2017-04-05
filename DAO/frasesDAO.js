var conecta = require('../conexion/conexion_sql.js')

//obtiene la conexion a la BD
var conexion = conecta.getConexion();
//--------------------------------------------------

var resultado = [];

var query_select = "select * from frases";
//--------------------------------------------------

/*
Esto esta escrito en ES6
*/

exports.index = (llamado, respuesta) => {
	
	conexion.query(query_select, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res.length > 0 ? res : [{"resultado":"No se encontraron resultados."}];			
		}
		
		console.log(resultado)

		respuesta.render('index.ejs', {'frases': resultado})
	})
}

exports.inserta = (llamado, respuesta) => {

	var query_insert = "INSERT INTO `frases` (`pkID`, `nombre`, `frase`) VALUES (NULL, '"+llamado.body.nombre+"', '"+llamado.body.frase+"')";	

	conexion.query(query_insert, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res;			
		}
		
		console.log(resultado)

		respuesta.redirect('/')
	})
}

exports.ver_frase = (llamado, respuesta) => {

	//console.log(llamado.params)

	var query_select_f = "select * from frases where pkID = "+ llamado.params.id;

	conexion.query(query_select_f, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res.length > 0 ? res : [{"resultado":"No se encontraron resultados."}];			
		}
		
		//console.log(resultado)

		respuesta.render('show_frase.ejs', {'frase': resultado[0]})
	})
}

exports.edita = (llamado, respuesta) => {
	
	var query_edita = "select * from frases where pkID = "+llamado.params.id;

	conexion.query(query_edita, (err, res) => {

		if (err) {
			throw err
		} else {
					
			resultado = res.length > 0 ? res : [{"resultado":"No se encontraron resultados."}];			
		}

		console.log(resultado)

		respuesta.render('edita_frase.ejs', {'frase': resultado[0]})
	})
}

exports.update = (llamado, respuesta) => {
	
	var query_update = "update frases set nombre = '"+llamado.body.nombre+"', frase = '"+llamado.body.frase+"' where pkID = "+llamado.params.id;

	conexion.query(query_update, (err, res) => {

		if (err) {
			throw err
		} else {
					
			resultado = res;			
		}

		console.log(resultado)
		//respuesta.render('edita_frase.ejs', {'frase': resultado[0]})
		respuesta.redirect('/')
	})
}

exports.destroy = (llamado, respuesta) => {
	
	var query_delete = "DELETE FROM `frases` WHERE `pkID` = "+llamado.params.id;

	conexion.query(query_delete, (err, res) => {

		if (err) {
			throw err
		} else {
					
			resultado = res;			
		}

		console.log(resultado)
		//respuesta.render('edita_frase.ejs', {'frase': resultado[0]})
		respuesta.redirect('/')
	})

	/*DELETE FROM `frases` WHERE `frases`.`pkID` = 1*/
}