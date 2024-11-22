const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            message: "Token não fornecido"
        })
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({
            error: true,
            message: "Tipo do Token Invalido"
        })
    }

    const [scheme, token] = parts;

    if (scheme.indexOf("pedrodev") !== 0) {
        return res.status(401).json({
            error: true,
            message: "Token Não Formatado"
        })
    }

    return jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Token Expirado"
            })
        }

        req.userLogged = decoded;
        return next();
    })
}