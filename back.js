import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import cors from "cors";

//import data_array from "./public/userprofile_script.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'usersession',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge:900000 }
}));

mongoose.connect("mongodb://127.0.0.1:27017/userdata");

mongoose.connection.once('open',()=>{
    console.log(`connected to mongodb successfully`)
})

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    emailid: String,
    numbers: [Number]
});

const User = mongoose.model("User", userSchema);

app.post("/joinus", async(req, res) => {

    const present =  await User.findOne({username:req.body.username});

    if(present){
        res.render('joined',{
            title : "Oops!",
            subtitle : "Username already registered :("
        });
    }
    else{

        try{
            req.body.numbers = [0,0,0,0,0,0,0,0,0,0];
            const myData = new User(req.body);
            myData.save();
            res.redirect('/joined');
        }
        catch{
            res.render('joined',{
                title : "Oops!",
                subtitle : "Some Unexpected Error Occurred :("
            });
        }
    
    }
});

app.get('/joined', (req,res)=>{
    res.render('joined',{
        title : "Congratulations!",
        subtitle : "You have successfully joined us :)"
    });
})


app.post("/login", async(req,res)=>{    

    try{
        const check = await User.findOne({username:req.body.username});

        if(check){
            if(check.name===req.body.name){

                req.session.user = check;
                req.session.username = check.username; // Store user session
                req.session.name = check.name;
                req.session.emailid = check.emailid;
                req.session.array = check.numbers;
                res.redirect(`/userprofile/${check.username}`); // Redirect to their personal page
            }
            else{
                res.render('joined',{
                    title : "Oops!",
                    subtitle : "You have entered the incorrect name or username :("
                });
            }
        }
        else{
            res.render('joined',{
                title : "Oops!",
                subtitle : "You have entered the incorrect name or username hehe :("
            });
        }
    }
    catch{
        res.render('joined',{
            title : "Oops!",
            subtitle : "Some Unexpected Error Occurred :("
        });
    }
})

app.get("/userprofile/:name", (req, res) => {
    if (!req.session.user || req.session.username !== req.params.name) {
        return res.render('joined',{
            title : "Sus!",
            subtitle : "Trying to cheat with us >:|"
        });
    }

    res.render("userprofile", { 
        name: req.session.name, 
        username: req.session.username,
        emailid: req.session.emailid,
        array: req.session.array
    });
});

app.post("/update", (req,res)=>{
    const receivedArray = req.body.numbers;  // Extract array from request
    console.log("Received Array:", receivedArray);

    for(let i=0;i<10;i++){
        receivedArray[i]+=req.session.array[i];
    }

    async function update_array(user, updateData) {
        await User.updateOne({ username: user }, updateData);
        console.log('Array updated successfully');
    }
    
    update_array(req.session.username, { numbers: receivedArray });
    

});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

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


