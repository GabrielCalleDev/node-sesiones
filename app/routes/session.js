// Formato de colores a imprimir por consola
const danger  = "\x1b[41m"
const success = "\x1b[42m"
const reset   = "\x1b[0m"

exports.authAdmin = (req, res, next) => {
    if ( req.session.auth.isAuth && req.session.auth.info.rol === "admin"){
        console.log(success, "[ 200 ]: accesso permitido", reset)
        return next()
    }else{
        console.log(danger, "[ 401 ]: accesso prohibido", reset)
        return res.render('forbidden')
    }
}

exports.replaceUndefinedReqs = (req, res, next) => {
    // comprobar si algunos campos están undefined y sustituirlos por {}
    if ( req.session.auth == undefined) req.session.auth = {}
    if ( req.session.auth.info == undefined) req.session.auth.info = {}
    next()
}