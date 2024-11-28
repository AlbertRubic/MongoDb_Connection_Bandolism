const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 4000

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
const db =mongoose.connection
db.once('open',()=>{
    console.log("MongoDB connection sucessful")
})

const userSchema =new mongoose.Schema({
    name: String,
    age: Number,
    program: String,
    yas: String,
})

const Users = mongoose.model("Users", userSchema)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async(req,res)=>{
    const {name,age,program,yas}=req.body
    const user = new Users({
        name,
        age:parseInt(age),
        program,
        yas,
    })
    await user.save()
    console.log(user)
    res.send("Form Submision Sucessful")
})

app.listen(port,()=>{
    console.log("server started")
})