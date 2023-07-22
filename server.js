//import statements 
const crypto = require('crypto');
const algorithm='aes-256-cbc';
const key="adnan-tech-programming-computers";
const iv=crypto.randomBytes(16);
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mailgen= require('mailgen');
const nodemailer = require('nodemailer');
const cookieParser= require('cookie-parser');
var pn=1;

const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


//connect mongodb....
// mongoose.connect("mongodb://localhost:27017/project_db", { useNewUrlParser: true });

mongoose.connect(
    'mongodb+srv://arogya702:sweetyakansha@cluster0.afzoaox.mongodb.net/rogya_predictor',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
     
    }
)
.then(() => console.log('DB Connection Successfull'))
.catch((err) => {
    console.error(err);
});

// define schema.....

const details_schema = {
  cid:Number,
  name_of_store: String,
  address: String,
  img:String,
  contact_detail: String,
  city:String,
  pin:Number,
  state:String
};
//create tables.
const details = mongoose.model("details", details_schema);

app.get("/",function(req,res){
  res.render("front",{user:"Register"});
})
app.get("/near_by_store",function(req,res){
    async function saveItem() {
        try {
          const results = await details.find({});
          const cnt = await details.countDocuments({});
          res.render("near_by_store", { itemlist: results,pagenumber:pn,count:cnt}); 
        } catch (error) {
          console.log(error);
        }
      }
      saveItem();
    
});
app.post("/next",function(req,res){
    pn++;
    async function nextelement() {

      try {
        const results = await details.find({});
        const cnt = await details.countDocuments({});
      res.render("near_by_store", { itemlist: results,pagenumber:pn,count:cnt}); 
      }
      catch{
        console.log("error");
      }
    }
  nextelement();
})
app.post("/searchbycity",function(req,res){
   pn=1;
  const city=req.body.city;
  async function nextelement() {
    try {
      const results = await details.find({city:city});
      const cnt = await details.countDocuments({});
    res.render("near_by_store", { itemlist: results,pagenumber:pn,count:cnt}); 
    }
    catch{
      console.log("error");
    }
  }
nextelement();
})

//////////////////////////////////////////////login page////////////////////////////////////////////////

// Configure middleware for parsing request bodies
//app.use(express.urlencoded({ extended: true }));


// app.set("view engine", "ejs");
// app.use(express.static("public"));
// Connect to MongoDB

// mongoose.connect(
//     'mongodb://0.0.0.0:27017/arogya',{
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
     
//     },secondDBConfig 
// )
// .then(() => console.log('DB Connection Successfull'))
// .catch((err) => {
//     console.error(err);
// });


// Define a user schema
const userSchema = new mongoose.Schema({
  uid:Number,
  name: String,
  email: String,
  password: String,
});

// Create a user model
const User = mongoose.model('User', userSchema);
app.get("/login_page",(req,res)=>{
    res.render("login",{message:""});
})


app.get("/talk",(req,res)=>{
  res.render("talk");
})


/*******************************************start detail render*********************************************************** */

app.get("/detail_page",async (req,res)=>{
  const email=(req.query.name);
  var nm,pass;
  User.findOne({ email: email })
  .select('name password') // Select only the name and password fields
  .exec((err, user) => {
    if (err) {
      console.error('Error retrieving user:', err);
      // Handle the error if needed
    } else if (user) {
      const { name, password } = user;
      console.log('User found:');
      const storedPassword = password;

      
      var str2 = storedPassword.split("&#128");
    
      let flag=1;
      let i=-1;
      str2.forEach(element => {
         if(i!=-1&&password[i]!=String.fromCharCode(element))flag=0;
         i++;
       });

      // Compare the entered password with the decrypted password
      //console.log(password+" "+decryptedData);
     // console.log(flag);
    
      // if (flag==1) {
      //   res.cookie('user_name', username, {
      //     httpOnly: true
      //   });
      res.render("details",{name:name,password:"",email:email,msg:""});
     
      console.log('Name:', name);
      console.log('Password:', str2);
      // Handle the user data as needed
    } else {
      console.log('User not found');
      res.render("details",{name:"",password:"",email:"",msg:""});
      // Handle the case when the user is not found
    }

  });
  
});


/*********************************************end detail render********************************************************* */

/*******************************************************start update************************************************************ */
app.post('/update',async(req,res)=>{
  const name=req.body.name;
  const email=req.body.email;
  let password=req.body.password;
  const user = await User.findOne({ email:email });

if (user) {
  // Update the desired fields
  user.name = name;
 
  let clutter="";
  let str = password.split("")
  str.forEach(element => {
      clutter += `&#128${(element.charCodeAt())} `
      // console.log((element.charCodeAt()) * Math.floor(Math.random() * 10))
  });
  password=clutter;
  // Save the updated document
  user.password = password;
  await user.save();
  res.render("details",{name:name,password:password,email:email,msg:"User data updated successfully"});
     
  console.log('User data updated successfully');
} else {
  res.render("details",{name:name,password:password,email:email,msg:"User not found"});
     
  console.log('User not found');
}
})
/*********************************************************end update************************************************************* */

app.post('/register', async (req, res) => {
  
    // Extract user details from the request body
    //const { name, email, password } = req.body;
    const name=req.body.name;
    const email=req.body.email;
    let password=req.body.password;
    //encrypted
    let clutter="";
     let str = password.split("")
     str.forEach(element => {
         clutter += `&#128${(element.charCodeAt())} `
         // console.log((element.charCodeAt()) * Math.floor(Math.random() * 10))
     });
     password=clutter;

   // email sending
     let config ={
      service: 'gmail',
      auth :{
        user:'unikon2023@gmail.com',
        pass:'dfgmutlabvhqxvlr'
      }
     }
    let transporter= nodemailer.createTransport(config);
    let mailgenerator= new mailgen({
       theme: "default",
       product:{
         name: "unikon",
         link:"https://mailgen.js/"
       }
    })
    let response ={
      body:{
        intro:name,
        table:{
           data:{
            description:{ f:"Welcome to Unikon! We're thrilled to have you on board and would like to extend our warmest greetings.",
             s:"Congratulations on successfully logging into your Unikon account. You now have access to a world of exciting features and services designed to enhance your experience Should you have any questions, concerns, or need any assistance, our support team is always here to help.",
             t:"Feel free to reach out to us . Thank you once again for joining Unikon. We look forward to serving you and ensuring a seamless and enjoyable experience. " }
           }
        },
        outro:"looking forward to do more business!!"
      }
    }
     let mail=mailgenerator.generate(response);
     let message={
      from:"unikon2023@gmail.com",
      to:email,
      subject:"you login successfully",
      html:mail

     }
     transporter.sendMail(message).then(()=>{
      console.log("send succesfully !!");
     }).catch(error=>{
      console.log("error!!");
     });
     const item1 = new User({
     
      email: email,
      password: password,
      name: name
    });
    async function saveItem() {

      try {
        await item1.save();
        console.log("Item saved successfully!");
        res.render("login",{message:"signin succesfully kindly login !!"});
       
      } catch (error) {
        console.log(error);
        res.render("login",{message:"error try again!!"});
      }
    }
    saveItem();
});



// Handle user sign-in

app.post("/login", function (req, res) {
  const username = req.body.name1;
  const password = req.body.pass1;

 User
    .findOne({ email: username })
    .then(async (data) => {
      if (data) {
        const storedPassword = data.password;

      
        var str2 = storedPassword.split("&#128");
      
        let flag=1;
        let i=-1;
        str2.forEach(element => {
           if(i!=-1&&password[i]!=String.fromCharCode(element))flag=0;
           i++;
         });

        // Compare the entered password with the decrypted password
        //console.log(password+" "+decryptedData);
       // console.log(flag);
      
        if (flag==1) {
          res.cookie('user_name', username, {
            httpOnly: true
          });
       
          res.render("front", { user:username });
        } else {
          res.render("front", { user: "Please enter a valid username or password!" });
        }
      } else {
        res.render("front", { user: "Please enter a valid username or password!" });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});


////listen

app.listen(3000,function(){
  console.log("server started at port 3000");
})