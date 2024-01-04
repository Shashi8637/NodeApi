step by step MVC API create


npm init
npm i express dotenv mongoose nodemon cookie-parser (add dependencies)
add "type":"module"  below the main in pakage.Json
"start": "npm server.js"; (in the scripts)
"dev":"nodemon server.js"; (in the scripts)


step -1(create app.js file )
[
import express from "express";
import userRouter from './routes/user.js';
import  {config} from "dotenv"


export const app = express();

config({
    path:"./data/config.env",
});

//using Middlewares
app.use(express.json());
app.use("/users",userRouter);



app.get("/",(req,res)=>{
    res.send("nice working");
});

]




step-2(create config.env file in data folder)
[
PORT = 4000 
MONGO_URI = mongodb://127.0.0.1:27017
]




step-3 (create database.js file in data folder)
[
import mongoose from "mongoose";

export const connectDB=()=>{
    mongoose
.connect(process.env.MONGO_URI,{
    dbName:"backendapi",
})
.then(()=>console.log("Database Connected"))
.catch((e)=>console.log(e));
};

]




step-4(create user.js file in model folder == strucure of database || schema of database )
[
import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

export  const User = mongoose.model("User",schema);
]





step-5(create server.js file)
[
import {app} from "./app.js";
import { connectDB } from "./data/database.js";


connectDB();
app.listen(process.env.PORT,()=>{
    console.log("server is working");
});
]






step-6(create user.js file in router folder == create route)
[
import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, getUserDetails, register, specialFunc } from "../controllers/user.js";

const router = express.Router();

router.get("/all",getAllUsers);
router.post("/new",register);
router.get("/userid/special",specialFunc);
router.get("/userid/:id",getUserDetails);


export default router;
]





step-7(create user.js file in controllers folder == function of api )
[
  import { User } from "../models/user.js";

export const getAllUsers = async(req,res)=>{

    const users = await User.find({});

    const keyword = req.query.keyword;
    console.log(keyword);
       res.json({
           success:true,
           users,
       });
   };

export const  register = async(req,res)=>{
    const { name, email, password } = req.body;
    
      await User.create({
        name,
        email,
        password,
     });
        res.status(201).cookie("temp","lol").json({
            success:true,
            message:"Registered successfully",
        });
    };

export const specialFunc = (req,res)=>{
    res.json({
        success:true,
        message:"just joking",
    });
};

export const getUserDetails = async(req,res)=>{
    const {id} = req.query;
    const user = await User.findById(id);
    
    res.json({
       success:true,
       user,
    });
    
    
    };
]






