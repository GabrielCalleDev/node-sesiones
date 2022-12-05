var mongoose = require("mongoose"),
    Schema   = mongoose.Schema;

var UsuarioSchema = new Schema({
    id      : {type:Number, required:true},
    usuario : {type:String, required:true},
    password: {type:String, required:true},
    rol     : {type:String, required:true}
});

module.exports = mongoose.model("Usuario", UsuarioSchema);