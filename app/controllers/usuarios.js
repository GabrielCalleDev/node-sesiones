const Usuarios = require("../models/usuario");
const md5      = require("md5");

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

exports.consultarUserPass = async (parametros) => {
	try {
		const usuario = await Usuarios.findOne({ usuario: parametros.usuario, password: md5(parametros.password)});
		return usuario;
	} catch (error) {
		console.error(`Error getting "Usuario" ${error}`);
	}
}