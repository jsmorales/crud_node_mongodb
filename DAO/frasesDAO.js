var conecta = require('../conexion/conexion_sql.js')

//obtiene la conexion a la BD
var conexion = conecta.getConexion();


/**/
var query_select = "select * from tareas";

var resultado = [];

exports.getFrases = () => {
	/**/
	conexion.query(query_select, (err, res) => {
		
		if (err) {
			throw err
		} else {
					
			resultado = res.length > 0 ? res : [{"resultado":"No se encontraron resultados."}];

			conexion.end()
		}
		
		console.log(resultado)
		
	})
}