var mysql = require('mysql')

var conexion = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'Lunel2016',
   database: 'node_prueba',
   port: 3306
});

exports.getConexion = () => {

	conexion.connect(function(error){
	   if(error){
	      throw error;
	   }else{
	      console.log('Conexion MySql correcta.');
	   }
	});

	return conexion;
}