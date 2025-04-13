import { z } from 'zod'; 
import pool from '../config/db.js'
import userdb from '../model/user.js' 
import Status from '../config/status.js'
import generateToken from '../config/generateToken.js'

export async function signupController(req ,res ){
    const schema = z.object({
        firstname : z.string().min(1, {message : 'firstname is required'}),
        lastname : z.string().min(1, {message : 'lastname is required'}),
        username : z.string().min(1, {message : 'username is required'}),
        email : z.string().email(1, {message : 'invalid email id'}),
        password: z.string().min(8, {message : 'password should be min length 8'}),
    })
    try{
        // console.log(req.body); 
        schema.parse(req.body); 
        let userExist =  await userdb.findOne({email : req.body.email}) ; 
        
        if( userExist ){
            // console.log(userExist);
            res.status(Status.BAD_REQUEST).json({message : "Email Id alredy exist"});
            return;  
        }
        let user = await userdb.create(req.body); 
        let token = generateToken(user); 
        res.status(Status.SUCCESS).json({token}); 
    }
    catch(error){
        if( error instanceof z.ZodError){
            res.status(Status.BAD_REQUEST).json("Bad request"); 
        }
        else {
            console.log(error); 
            res.status(Status.INTERNAL_ERROR).json({message : "Internal Server Error" }); 
        }
    }      
}
export async function loginController(req, res) {
    console.log(req.body);
    const { username, password } = req.body;
    
    try {
      // Input validation
      if (!username || !password) {
        return res.status(400).json({ message: "Invalid Input" });
      }
      
      // Query the PostgreSQL database
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
      
      // Check if user exists
      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Invalid username" });
      }
      
      const user = result.rows[0];
      
      // Check password (Note: Using plain text comparison - should use bcrypt in production)
      if (username === user.username && password === user.password) {
        const token = generateToken({ username });
        console.log(user.username + " logged in");
        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
// export default signupController; 