"use strict"

const Usuarios = require("../models/usuario")
const md5      = require("md5")

exports.getAll = async () => {
	try {
		const usuarios = await Usuarios.find({})
		return usuarios
	} catch (error) {
		console.error(`Error getting "Usuarios" ${error}`)
	}
}

exports.show = async (id) => {
	try {
		const usuario = await Usuarios.findOne({id:id})
		return usuario
	} catch (error) {
		console.error(`Error getting "Usuario" ${error}`)
	}
}

exports.comprobarUserPass = async (req) => {
	try {
		const usuario = await Usuarios.findOne({ 
			usuario: req.body.usuario, 
			password: md5(req.body.password)
		})
		if (usuario) {
			req.session.auth = { 
				isAuth:true, 
				info: { 
					name: usuario.usuario,
					rol: usuario.rol,
					nombre: usuario.nombre 
				} 
			}
		}else{
			req.session.auth = { isAuth: false }
		}
	} catch (error) {
		console.error(`Error checking "Usuario" ${error}`)
	}
}

exports.save = async (req) => {
	try {
		const usuario = new Usuarios({
			id: req.body.id,
			usuario: req.body.usuario,
			nombre: req.body.nombre,
			password: md5(req.body.password),
			rol: req.body.rol
		})
		await usuario.save()
		return usuario
	} catch (error) {
		console.error(`Error saving "Usuario" ${error}`)
	}
}

exports.delete = async (req) => {
	try {
		const usuario = await Usuarios.deleteOne({_id: req.params.id})
		return usuario
	} catch (error) {
		console.error(`Error deleting "Usuario" ${error}`)
	}
}

exports.crearAdminSinoExiste = async () => {
	try {
		const administrador = await Usuarios.findOne({ usuario:'admin' })
		if(!administrador){
			const usuario = new Usuarios({
				id: 1,
				usuario: "admin",
				nombre: "administrador",
				password: md5("password"),
				rol: "admin"
			})
			await usuario.save()
		}
	} catch (error) {
		console.error(`Error creating "Administrador" ${error}`)
	}
}