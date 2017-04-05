var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/primer_base', function(error){
   if(error){
      throw error; 
   }else{
      console.log('Conectado a MongoDB');
   }
});