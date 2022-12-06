const Usuarios = require("../models/usuario");
const md5      = require("md5");

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

exports.consultarUserPass = async (parametros) => {
	try {
		const usuario = await Usuarios.findOne({ usuario: parametros.usuario, password: md5(parametros.password)});
		return usuario;
	} catch (error) {
		console.error(`Error getting "Usuario" ${error}`);
	}
}




exports.save = async () => {
	try {
		const usuario = new Usuarios({
            id: 10,
            usuario: "admin",
            nombre: "gabriel",
            password: md5("password"),
            rol: "admin"
        })
        await usuario.save();
        return usuario;
	} catch (error) {
		console.error(`Error saving "Usuario" ${error}`);
	}
}