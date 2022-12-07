// Funciones para administrar las sesiones
const formatoRojo  = "\x1b[41m"
const formatoVerde = "\x1b[42m"
const formatoReset = "\x1b[0m"

exports.authAdmin = (req, res, next) => {
    if ( req.session.auth.isAuth && req.session.auth.info.rol === "admin"){
        console.log(formatoVerde, "[ 200 ]: accesso permitido", formatoReset)
        console.log(req.session.auth)
        return next()
    }else{
        console.log(formatoRojo, "[ 401 ]: accesso prohibido", formatoReset)
        return res.render('forbidden')
    }
}

exports.replaceUndefinedReqs = (req, res, next) => {
    // comprobar si algunos campos están undefined y sustituirlos por {}
    if ( req.session.auth == undefined)
        req.session.auth = {}

    if ( req.session.auth.info == undefined)
        req.session.auth.info = {}

    next()
}