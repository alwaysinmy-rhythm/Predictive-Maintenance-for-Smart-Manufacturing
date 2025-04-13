// const express = require('express') ;
import express from 'express'; 

import {signupController , loginController} from '../controller/signup.js'
import {machinedetailsController} from '../controller/machine.js'
import authentication from '../middleware/authentication.js';
import dotenv from 'dotenv' ;

const router = express.Router(); 
dotenv.config(); 



// import authenticate from  '../middleware/authentication.js' ; 
router.get('/' , (req, res )=>{
    res.json("Hello there!"); 
})

// router.get('/verfiy' , authentication);
router.post('/signup' , signupController ); 
router.post('/login' ,  loginController)
router.post('/machine_details' ,authentication,  machinedetailsController)


router.post('/test' , (req, res )=>{
    console.log(req.body); 
    res.json("Reached at test"); 
})

export default router ;