//Importing modules
const express = require('express');
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const VoiceMethods = require('./models/Voice');

//Importing controllers
const authRoute = require("./controllers/auth");
const voiceRoute = require("./controllers/voice");

//Config
dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Variables
const port = 8333;
global.globalToken = "";
global.userBackupId = "";
global.words = [];
global.userWords = [];
global.counterWords = 0;
global.currentWord = "";
global.currentResWords = [];
global.subWord = "";
global.result = "";


var cookieParser = require('cookie-parser');
app.use(cookieParser());



//Static files
app.use("/", express.static("assets"));

//Index GET
app.get("/", (req, res) => {
    res.render("index.ejs");
});

//logout GET
app.get("/logout", (req, res) => {
    res.cookie("globalToken", "");

    // global.globalToken = "";
    res.redirect('./login')
});

//logout GET
app.get("/reset", async (req, res) => {
    // let words = await VoiceMethods.getWords();
    // res.cookie("words", words);
    //
    // let userBackupId = req.cookies['userBackupId'];
    // await VoiceMethods.setUserWords(words, userBackupId);
    //
    // let userWords = await VoiceMethods.getUserWords(userBackupId);
    //
    //
    // let counterWords = await VoiceMethods.getCounterWords(words);
    //
    // res.cookie("userWords", userWords);
    // res.cookie("counterWords", counterWords);
    // res.cookie("startCounter", parseInt(0));
    // res.cookie("score", parseInt(0));
    // // global.globalToken = "";
    // res.redirect('./user/login')
});


//middleware
app.use(express.json());
//Route middleware
app.use("/user", authRoute);
app.use("/voice", voiceRoute);

app.listen(port, () => console.log(`the server is running on port ${port}`));
