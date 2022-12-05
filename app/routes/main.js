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

router.post('/login', async (req, res) => {
    // Comprobamos si existe el usuario y contraseña
    const usuario = await usuariosController.consultarUserPass(req.body)
    // Si el usuario y contraseña son correctos, establecemos el parametro "auth" en req.session
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
        req.session.auth = { isAuth: false}
    }
    res.redirect('/info')
})

router.get('/info', (req, res) => {
    res.render('info', { session: req.session });
});

router.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

/*Access only if logged in with session */
router.use(session.authAdmin)

router.get("/admin/welcome", (req, res) => {
    res.render("admin/welcome");
});

router.get("/admin/info", (req, res) => {
    res.render("admin/info");
});

router.get("/admin/user/:id", (req, res) => {
    res.render("admin/show-user");
});

router.get("/admin/user/create", (req, res) => {
    res.render("admin/create-user");
});

router.post("/admin/user/save", (req, res) => {
    res.redirect('/admin/users')
});

router.get("/admin/users", (req, res) => {
    res.render("admin/show-users");
});

module.exports = router;
