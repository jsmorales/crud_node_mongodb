var conecta = require('../conexion/conexion_sql.js')

//obtiene la conexion a la BD
var conexion = conecta.getConexion();
//--------------------------------------------------

var resultado = [];


//--------------------------------------------------

/*
Esto esta escrito en ES6
*/

creaScript = function (nomTabla,arrAttrs) {
	
	this.nomTabla = nomTabla;
	this.arrAttrs = arrAttrs;
	this.script = '';
}

creaScript.prototype = {

	select: function () {

		var self = this;

		this.script += 'select ';

		this.script = this.arrAttrs.length == 0 ? this.script += '* ' : this.attrs_select();

		this.script += 'from '+this.nomTabla;

		console.log(this.script)

		return this.script;
	},
	attrs_select : function(){

		var self = this;

		this.arrAttrs.forEach( function(element, index) {
				
			console.log(self.script);
			console.log(element);

			var attr_length = self.arrAttrs.length;

			element = (attr_length - 1) == index ? element += ' ' : element += ', ';

			self.script += element;
		});

		return this.script;
	},
	insert : function(){

		var self = this;

		this.script = 'INSERT INTO `'+this.nomTabla+'` ';

		this.arrAttrs.forEach( function(element, index) {
			console.log(element);
			console.log(index);
			
			//(`pkID`, `nombre`, `frase`)
			self.script += '( pkID, ';

			for (var i in element) {
				console.log(i);
				
				self.script += i+', ';

				console.log(element[i]);
			};

		})

		console.log(this.script);
	}
}

exports.index = (llamado, respuesta) => {

	var query_s = new creaScript('frases', []);

	var query_select = query_s.select();
	
	//-----------------------------------------

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

	//console.log(llamado.body);

	var query_i = new creaScript('frases', [llamado.body]);

	var query_insert = query_i.insert();
	/*
	conexion.query(query_insert, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res;			
		}
		
		console.log(resultado)

		respuesta.redirect('/')
	})*/
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