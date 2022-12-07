// Funciones para administrar las sesiones

exports.authAdmin = function(req, res, next) {
    if ( req.session.auth?.isAuth && req.session.auth?.info?.rol === "admin"){
        console.log("\x1b[42m","[ 200 ]: accesso permitido", "\x1b[0m")
        console.log(req.session.auth)
        return next()
    }else{
        console.log("\x1b[41m","[ 401 ]: accesso prohibido", "\x1b[0m")
        return res.render('forbidden')
    }
};