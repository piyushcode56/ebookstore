const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization']
    
    if(!auth){
        res.status(401).json({
            message:'unauthorized, jwt token is require'
        })
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET); 
        // console.log(decoded);
        req.user = decoded;  
        next();
    }
    catch(error){
        res.status(401).json({
            message:'unauthorized user, jwt token wrong or expired'
        })
    }
}

module.exports = ensureAuthenticated;