const express = require("express");
const app = express();
const mongo = require("mongoose");
const cors = require("cors");
const PORT = 8080;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const mysql = require('mysql')

const connectionObjection = {
  host: "localhost",
  user: "root",
  password: "",
  database:"nesa amara"
}

const connection = mysql.createConnection(connectionObjection);
connection.connect((err) =>{
  if(err){
    console.log('error')
  }else{
    console.log('nesa up')
// const connection = mysql.createConnection (connectionObjection);

// connection.connect((err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('mysql worked')
  }
})
 
const schema = Joi.object().keys({
  username: Joi.string().required().min(3).max(20),
  password: Joi.string().required().min(6).max(13).alphanum(),
  email: Joi.string().email().required(),
  fullname: Joi.string().required().min(3).max(20)
 })
  
  
app.use(express.json());
app.use(cors());
mongo.connect("mongodb://127.0.0.1:27017/nesa", err => {
if (err) {
  console.log("BROKEN");
} else {
  console.log("CONNECTED");
}
});
const blog = require("./models/blog")
const user = require("./models/user")
const blogpost = require("./models/blogpost")

app.get('/jobs',(req,res)=>{
  connection.query('SELECT * FROM `feedback`',(err,results,fields)=>{
    if (!err) {
      return res.json({
        'status': true,
        'result': results

      })
    }
    console.log(err);
    return res.json({
      'status': false,
      'message':'nothing to get'
    })
  })
})

app.get('/job',(req,res)=>{
  connection.query('SELECT * from `application_master` as am INNER JOIN `feedback` AS fb ON fb.jobseekid = am.jobseekid INNER JOIN `jobseeker_education` AS js ON js.jobseekid= am.jobseekid WHERE am.jobseekid=3',(err,results,fields)=>{
    if (!err) {
      return res.json({
        'status': true,
        'result': results
      })
    }
    console.log(err);
    return res.json({
      'status': false,
      'message': 'not responding'
    })
  })
})
app.post('/publishpost', (req,res)=>{
  const blogdetails = req.body
  const publishpost = new blogpost(
    {
      authorName: blogdetails.authorName,
      publicationTitle: blogdetails.publicationTitle,
      body: blogdetails.body
    }
  )
  publishpost.save((err,doc)=>{
    if(err) console.log(err)
    return res.json(doc)
  })
})

app.get('/savedata',(req,res)=>{
  const data = req.query
  const blogPost = new blog(
    {
      title: data.title,
      author: data.author,
      body: data.body,
      comment: 0,
      date: new Date()
    }
  )
  blogPost.save((err,doc)=>{
    return res.json(doc)
  })
})
 

app.post('/getposts',(req,res)=>{
  blogpost.find({},(err,doc)=>{
    if(err) {console.log(err)}
    else{
    return res.json({posts:doc})}
  });
});
app.post("/signup", (req, res) => {
  console.log(req.body)
const userDetails = req.body;
const result = Joi.validate(userDetails,schema)
 

const error = result.error
const value = result.value
var userSchema = new mongo.Schema({
  email: { type: String, required: true, unique: true},
});


if(error){
  return res.json(error)
}
const password = userDetails.password
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(password, salt);
userDetails.password = hash


const newUser = new user(userDetails);

newUser.save((err, doc) => {
  if (err) {
    console.log(err);
    return res.send("I got an error");
  }
     if (doc) {
       return res.json({
        status: true,
        userDetails: doc
       });
   }
           return res.json({
         status: false,
         message: "Pls try again"
       }); 
      });


});
app.post("/login", async (req, res) => {
console.log(req.body);
const userDetails = req.body;
const password = userDetails.password
user.findOne({email:userDetails.email}, async (err, doc) => {
  if (err) {
    return res.send("I got an error");
  } else {
    //   return res.json(doc);
    if (doc) {

      if(bcrypt.compareSync(password, doc.password)){
        const token = await new Promise(function(resolve,reject){
          jwt.sign(doc.toJSON(),'order',{
          expiresIn: '100h'
        },function(err, decode){resolve(decode)})
      });
      return res.json({
        status: true,
        userDetails: token
      });
    } else {
      // return res.send("No User Matching Details");
      return res.json({
        status: false,
        message: "No User Matching Details"
      });
    }
  }
}
})
});
app.get("/", (req, res) => {
res.send("yaaaaay....its working");
});


app.listen(PORT, err => {
if (err) {
  console.log(err);
} else {
  console.log("And We are live!!!!!!");
}
});


