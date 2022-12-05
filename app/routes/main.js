var express       = require("express");
var path          = require("path");
var router        = express.Router();
var controllerDir = "../controllers";

router.get("/", async (req, res, next) => {
    res.render("login-page");
});

router.get('/info', (req, res) => {
    res.redirect('/info');
});

/*Access only if logged in with session */
router.get("/admin/welcome", async (req, res, next) => {
    res.render("/admin/welcome");
});
router.get("/admin/info", async (req, res, next) => {
    res.render("/admin/info");
});

module.exports = router;
