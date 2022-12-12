"use strict"

const mongoose = require("mongoose"),
    Schema   = mongoose.Schema
    
const UsuarioSchema = new Schema({
    id       : { type:Number, required:true },
    nombre   : { type:String, required:true },
    usuario  : { type:String, required:true },
    password : { type:String, required:true },
    rol      : { type:String, required:true }
})

UsuarioSchema.set('timestamps', true)

module.exports = mongoose.model("Usuario", UsuarioSchema)