import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 
dotenv.config(); 
const secertkey = process.env.SECRET_KEY;


function generateToken(user){
    const payload = {
        username : user.username, 
    }
    return jwt.sign(payload , secertkey , {expiresIn : '1h'}); 
}

export default generateToken; 