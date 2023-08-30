const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.json({err: "You are not authourized"});
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
        if(err) {
            return res.json({err});
        }
        req.user = result;
        next();
    })
}