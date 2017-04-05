var mysql = require('mysql')

var conexion = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'Lunel2016',
   database: 'node_prueba',
   port: 3306
});

conexion.connect(function(error){
   if(error){
      throw error;
   }else{
      //console.log('Conexion MySql correcta.');
   }
});

var query_inserta = "INSERT INTO `tareas` (`pkID`, `nombre`, `terminada`) VALUES (NULL, 'Hacer un crud en node.js', '0')";
/*
esto sirve para update y delete
var inserta = conexion.query(query_inserta, function(error, result){
	
	if(error){
		throw error;
	}else{
		console.log(result);
		conexion.end();
	}
});*/

var query_select = "select * from tareas where pkID = 2";

var select = conexion.query(query_select, (err, res) => {
	if (err) {
		throw err
	} else {

		if (res.length > 0) {
			console.log(res[0].nombre)
			
		} else {
			console.log("No se encontraron resultados.")
		}

		//conexion.end()
		
	}
})

//conexion.end();