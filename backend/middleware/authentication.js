import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import Status from '../config/status.js';

dotenv.config(); 
const secretKey = process.env.SECRET_KEY;

function authentication(req, res, next) {
    // Get token from Authorization header or token header
    const token = req.headers.token;
    
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }
    
    try {
        // Verify token and decode it
        const decoded = jwt.verify(token, secretKey);
        
        // Extract username from the decoded token and add to request object
        req.username = decoded.username; 
        
        // Log successful authentication
        console.log(`User authenticated: ${req.username}`);
        
        // Pass control to the next middleware or route handler
        next();
    } 
    catch (error) {
        console.error('Authentication error:', error.message);
        return res.status(400).json({ message: 'Invalid token' });
    }
}

export default authentication;