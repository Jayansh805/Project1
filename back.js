const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const notifier = require('node-notifier');
//const popup = require('popups');
//const alert = require('alert'); 

// const pg_switch = require("./public/pg_switch.js");

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/userdata");

mongoose.connection.once('open',()=>{
    console.log(`connected to mongodb successfully`)
})

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    emailid: String
});

const User = mongoose.model("User", userSchema);

app.post("/joinus", (req, res) => {
    const myData = new User(req.body);
    myData.save()
      .then(item => {
        res.redirect('/joined');
      })
      .catch(err => {
        res.status(400).send("Oops! Unexpected Error Occurred.");
      });
});

app.get('/joined', (req,res)=>{
    res.render('joined');
})

const userloginSchema = new mongoose.Schema({
    name: String,
    username: String,
});

const Usercred = mongoose.model("Usercred", userloginSchema);

app.post("/login", async(req,res)=>{    

    try{
        const check = await User.findOne({name:req.body.name});

        if(check){
            if(check.username===req.body.username){
                res.send(`Name : ${check.name} <br/>Username : ${check.username} <br/>Email Id : ${check.emailid}`);
            }
            else{
                res.send("Wrong Username");
            }
        }
        else{
            res.send(`Wrong Name`)
        }
    }
    catch{
        res.send(`Unexpected Error Occurred :(`);
    }
})

app.get('/cv',function(req,res) {
    console.log('cv-downloaded');

    res.download(__dirname+'/public/dummy_cv.pdf', function(err) {
        if(err) {
            console.log(err);
        }
    })
})

app.get('/', function(req, res) {
    res.sendFile('/index.html', {root: __dirname });
});

app.listen(3000, ()=>{
    console.log(`About me`);
});


