const express = require("express");
const app = express();

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile('/index.html', {root: __dirname })
});

app.listen(3000, ()=>{
    console.log(`About me`);
});

