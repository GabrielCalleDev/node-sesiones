const Usuarios = require("../models/usuario");
const md5      = require("md5");

exports.save = async () => {
	try {
		const usuario = new Usuarios({
            id: 10,
            usuario: "gabriel",
            password: md5("gabriel"),
            rol: "admin"
        })
        await usuario.save();
        return usuario;
	} catch (error) {
		console.error(`Error saving "Usuario" ${error}`);
	}
}
