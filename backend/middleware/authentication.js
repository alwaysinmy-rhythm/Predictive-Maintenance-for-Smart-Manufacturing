import jwt from 'jsonwebtoken'; 
function authentication(req, res ){
    let token = req.headers.token; 
    try {
        jwt.verify(token , "1234") ;
    }
    catch(error){
        res.json("Invalid Token");
    }
}

export default authentication ;