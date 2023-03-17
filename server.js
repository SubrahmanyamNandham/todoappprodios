const express=require("express");
const jwt=require("jsonwebtoken");
const cors = require('cors');
const middleware=require("./middleware")
const TaskSchema = require('./module');

const Sign =require("./sign");
const mongoose=require("mongoose");

const app=express();

mongoose.connect("mongodb+srv://subrahmanyamnandham:subrahmanyam@cluster0.hmwponq.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>console.log("Db connect")
)


app.use(express.json())


app.use(cors({
    origin: '*'
}))


app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo : todo
        });
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.get('/gettask',async(req,res) => {
    try{
        return res.json(await TaskSchema.find()) ;
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id',async(req,res) => {
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err);
    }
})

app.post("/register",async(req,res)=>{

    try{
        const {email,username,password,confirmpassword}=req.body;
        const exist=await Sign.findOne({email});
        if (exist){
            return res.status(400).send("user already registered please try another mail Id");
        }
        if(password!=confirmpassword){
            return res.status(403).send("invalid password");
        }
        let newUser=new Sign({
            email,username,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send("User registered");

    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server error");
    }
})

app.post("/profiles",middleware,async (req,res)=>{
    try{
     let profiles=await Sign.find();
     return res.json(profiles);
      
    }
    catch(err){
        console.log(err);
        return res.status(500).send("server error")
    }
})

app.get('/myprofile',middleware,async(req, res)=>{
    try{
        let exist = await Sign.findById(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.post('/login',async (req, res) => {
    try{
        const {email,password} = req.body;
        let exist = await Sign.findOne({email});
        if(!exist) {
            return res.status(400).send('User Not Found');
        }
        if(exist.password !== password) {
            return res.status(400).send('Invalid credentials');
        }
        let payload = {
            user:{
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:3600000},
          (err,token) =>{
              if (err) throw err;
              return res.json({token})
          }  
            )

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.listen(7000,()=>console.log("server is running..."))