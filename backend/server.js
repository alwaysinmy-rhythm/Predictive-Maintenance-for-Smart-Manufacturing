import express from 'express' ;
import cors from 'cors'; 

import router from './routes/userRoutes.js'
const PORT = 8000;
const app = express() ; 
app.use(express.json()) ;

app.use(
	cors({
	  origin: "*", // Allow any origin
	  methods: ["GET", "POST", "PUT", "DELETE"], 
	  allowedHeaders: ["Content-Type", "Authorization", "token"], // Added "token" to match your frontend
	  credentials: true,
	})
  );
app.use('/' ,router );

app.listen(PORT, ()=>{
    console.log("Server is listening on " + PORT ); 
})


//implement signup and login
//use mongodb and postgres config both.
//for mongodb create model 
//create a signup route on which req will contain firstname , lastname , username , emailid , password 
//create a login route on which req will contain username , password. 
///create a middle ware which will check for each 