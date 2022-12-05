// Funciones para administrar las sesiones

exports.authAdmin = function(req, res, next) {
    console.log(req.session)
    if ( req.session.auth && req.session.auth?.info?.rol === "admin")
        return next();
    else
        return res.render('forbidden');
};