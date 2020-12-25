const jwt = require('jsonwebtoken');
const config = require('config');



module.exports = function(req, res, next){
    // getting token from header
    const token = req.header('x-auth-token');

    // checking if there is a token
    if(!token){
        return res.status(401).json({ mesg: 'No token, authorization denied'});
    } 

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid'});
        
    }
}