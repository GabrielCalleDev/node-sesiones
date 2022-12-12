"use strict"

const express          = require("express"),
    router             = express.Router(),
    usuariosController = require("./../controllers/usuarios"),
    morgan             = require("morgan"),
    session            = require('./session')

// Middleware para mostrar las peticiones de la app
router.use(morgan("dev"))
// Middleware para corregir "undefined"
router.use(session.replaceUndefinedReqs)
// Middleware para todas las rutas /admin
router.use('/admin', session.authAdmin)

/*
|--------------------------------------------------------------------------|
|  Rutas de la aplicación                                                  |
|--------------------------------------------------------------------------|
*/

router.get("/", (req, res) => {
    res.render("login-page")
});

router.post('/login', async (req, res) => {
    await usuariosController.crearAdminSinoExiste()
    await usuariosController.comprobarUserPass(req)
    res.redirect('/info')
})

router.get('/info', async (req, res) => {
    res.render('info', { nombre: req.session.auth.info.nombre, logueado: req.session.auth.isAuth})
});

router.get('/logout',(req,res) => {
    req.session.destroy()
    res.redirect('/')
});


/*
|--------------------------------------------------------------------------|
|  Rutas de admin                                                          |
|--------------------------------------------------------------------------|
|
| Access only if logged in with session and rol admin
|
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
    await usuariosController.save(req)
    res.redirect('/admin/welcome')
});

router.get('/admin/user/delete/:id', async (req, res) => {
    await usuariosController.delete(req)
    res.redirect('/admin/welcome')
});

router.get("/admin/user/:id", async (req, res) => {
    const usuario = await usuariosController.show(req.params.id)
    res.render("admin/show-user", {usuario:usuario, id:req.params.id})
});

module.exports = router;