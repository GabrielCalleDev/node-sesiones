var express            = require("express");
var path               = require("path");
var router             = express.Router();
var controllerDir      = "../controllers";
var usuariosController = require(controllerDir + "/usuarios")
var morgan             = require("morgan")
var session            = require('./session')

router.use(morgan("dev"))

router.get("/", (req, res) => {
    res.render("login-page");
});

router.post('/login', async (req, res) => {
    // Comprobamos si existe el usuario y contraseña
    const usuario = await usuariosController.consultarUserPass(req.body)
    // Si el usuario y contraseña son correctos, establecemos el parametro "auth" en req.session
    if (usuario) {
        req.session.auth = { isAuth:true, info: { name: usuario.usuario, rol: usuario.rol, nombre: usuario.nombre } }
    }else{
        req.session.auth = { isAuth: false }
    }
    res.redirect('/info')
})

router.get('/info', async (req, res) => {
    // usuarioAdministrador obtiene el documento de admin(id=1)
    // Si no existe, la vista muestra un enlace para crearlo. Útil para testear. Destino de ruta: /crear-admin
    // Si existe, la vista no muestra ningún enlace
    const usuarioAdministrador = await usuariosController.show(1) 
    res.render('info', { nombre: req.session.auth?.info?.nombre, logueado: req.session?.auth?.isAuth, admin:usuarioAdministrador });
});

router.get("/crear-admin", async (req, res) => {
    await usuariosController.createAdmin();
    res.redirect("/");
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});


/*
    ***************************************************
    Access only if logged in with session and rol admin
    ***************************************************
*/
router.use(session.authAdmin)

router.get("/admin/welcome", async (req, res) => {
    const usuarios = await usuariosController.getAll()
    res.render("admin/welcome", {usuarios:usuarios});
});

router.get("/admin/info", (req, res) => {
    res.render("admin/info");
});

router.get("/admin/user/create", (req, res) => {
    res.render("admin/create-user");
});

router.post("/admin/user/save", async (req, res) => {
    const usuario = await usuariosController.save(req);
    console.log(usuario)
    res.redirect('/admin/welcome')
});

router.get('/admin/user/delete/:id', async (req, res) => {
    const usuario = await usuariosController.delete(req);
    console.log(usuario);
    res.redirect('/admin/welcome');
});

router.get("/admin/user/:id", async (req, res) => {
    const usuario = await usuariosController.show(req.params.id)
    console.log(usuario)
    res.render("admin/show-user", {usuario:usuario, id:req.params.id});
});

module.exports = router;