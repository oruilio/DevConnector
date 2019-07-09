const jwt = require('jsonwebtoken');
const config = require('config');
                                            //middleware function is basically just a function that has access to the request and response cycle
module.exports = function(req, res, next){  //middleware function take three params

    //Get token from header (when we send a request to a protected route we need to send the token with header)
    const token = req.header('x-auth-token');

    //Check if no token
    if(!token){
        return res.status(401).json( { msg: 'No token, authorization denied' });   
    }

    //Verify the token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;      //assign the user 
        next();
    }catch(err){
        res.status(401).json({ msg:'Token is not valid' });
    }
}