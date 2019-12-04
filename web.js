const express = require('express');
const bodyParser = require("body-parser");
const pkgInfo = require('./package.json');

const app = express();
app.use(bodyParser.json());

app.get('./',(req,res)=>{
    res.json({version: pkgInfo.version});
});

var server = app.listen(process.env.PORT, "0.0.0.0",function(){
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Now running on http://${host}:${port}`);
});

module.exports = (bot)=>{
    app.post('/'+bot.token,(req,res)=>{
        bot.processUpdate(req.body);
        res.sendStatus(200);
    });
};