const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    let token = req.cookies['globalToken'];
    
    if (!token) {
        req.user = "Access denied";
        next();
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        req.user = "Invalid token";
        next();
    }
}
