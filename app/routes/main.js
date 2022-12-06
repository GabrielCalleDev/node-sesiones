var express            = require("express");
var path               = require("path");
var router             = express.Router();
var controllerDir      = "../controllers";
var usuariosController = require(controllerDir + "/usuarios")
var morgan             = require("morgan")
var session            = require('./session')

router.use(morgan("dev"))

router.get("/", async (req, res, next) => {
    //const resultado = await usuariosController.save();
    res.render("login-page");
});

router.get("/crear", async (req, res, next) => {
    const resultado = await usuariosController.save();
    res.redirect("/");
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

router.get('/info', (req, res) => {
    res.render('info', { nombre: req.session.auth?.info?.nombre, logueado: req.session?.auth?.isAuth });
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

/*Access only if logged in with session and rol admin */
router.use(session.authAdmin)

router.get("/admin/welcome", async (req, res) => {
    const usuarios = await usuariosController.getAll()
    res.render("admin/welcome", {usuarios:usuarios});
});

router.get("/admin/info", (req, res) => {
    res.render("admin/info");
});

router.get("/admin/user/:id", async (req, res) => {
    const usuario = await usuariosController.show(req.params.id)
    console.log(usuario)
    res.render("admin/show-user", {usuario:usuario, id:req.params.id});
});

router.get("/admin/create/user", (req, res) => {
    res.render("admin/create-user");
});

router.post("/admin/save/user", async (req, res) => {
    console.log(req.body)
    const usuario = await usuariosController.save(req);
    console.log(usuario)
    res.redirect('/admin/welcome')
});

router.get('/admin/delete/:id', async (req, res) => {
    const usuario = await usuariosController.delete(req);
    console.log(usuario);
    res.redirect('/admin/welcome');
});

module.exports = router;