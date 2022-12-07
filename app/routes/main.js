var express            = require("express")
var router             = express.Router()
var controllerDir      = "./../controllers"
var usuariosController = require(controllerDir + "/usuarios")
var morgan             = require("morgan")
var session            = require('./session')

// Middleware para mostrar las peticiones de la app
router.use(morgan("dev"))
// Middleware para corregir "undefined"
router.use(session.replaceUndefinedReqs)
// Middleware para todas las rutas /admin
router.use('/admin', session.authAdmin)

/**
 * Rutas de la aplicación
 */

router.get("/", (req, res) => {
    res.render("login-page")
});

router.post('/login', async (req, res) => {
    await usuariosController.comprobarUserPass(req)
    res.redirect('/info')
})

router.get('/info', async (req, res) => {
    /**
     * Para testear nuestra aplicación, cuando se accede a info nos da la opcion
     * de crear el usuario administrador si esté no existe. admin/password con id = 1
     * 
     * Si el usuario 'admin' no existe, en la vista aparece un enlace para crearlo. Enlace a: /crear-admin
     * Si el usuario 'admin' existe, la vista ya no muestra la opción de crearlo
     * 
     * Esto se controla obteniendo el documento de admin en la constante: "usuarioAdministrador"
     */
    const usuarioAdministrador = await usuariosController.show(1) 
    res.render('info', { nombre: req.session.auth.info.nombre, logueado: req.session.auth.isAuth, admin:usuarioAdministrador })
});

router.get("/crear-admin", async (req, res) => {
    await usuariosController.createAdmin()
    res.redirect("/")
});

router.get('/logout',(req,res) => {
    req.session.destroy()
    res.redirect('/')
});


/*
    ***************************************************
    Access only if logged in with session and rol admin
    ***************************************************
*/

router.get("/admin/welcome", async (req, res) => {
    const usuarios = await usuariosController.getAll()
    res.render("admin/welcome", {usuarios:usuarios})
});

router.get("/admin/info", (req, res) => {
    res.render("admin/info")
});

router.get("/admin/user/create", (req, res) => {
    res.render("admin/create-user")
});

router.post("/admin/user/save", async (req, res) => {
    const usuario = await usuariosController.save(req)
    console.log(usuario)
    res.redirect('/admin/welcome')
});

router.get('/admin/user/delete/:id', async (req, res) => {
    const usuario = await usuariosController.delete(req)
    console.log(usuario)
    res.redirect('/admin/welcome')
});

router.get("/admin/user/:id", async (req, res) => {
    const usuario = await usuariosController.show(req.params.id)
    console.log(usuario)
    res.render("admin/show-user", {usuario:usuario, id:req.params.id})
});

module.exports = router;