require("dotenv").config({path:`${__dirname}/config/dev.env`});

const token = process.env.TELEGRAM;
console.log(process.env);
const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production'){
    bot = new Bot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
}else{
    bot = new Bot(token,{polling:true});
}
console.log("Bot server started in "+process.env.NODE_ENV+" mode");
bot.onText(/\/stock(.+)/, (msg,match)=>{
    let chatId = msg.chat.id;
    let stock = match[1];
    request(`https://kams-stocks.herokuapp.com/${stock}`,(error,response,body)=>{
        if(!error && body){
            let res = JSON.parse(body);
            if(res.stockPrice === " "){
                bot.sendMessage(chatId,"Stock not found!");
                return;
            }
            bot.sendMessage(chatId,`The current price in BSE for ${res.stockName} is ${res.stockPrice}`);
        }
    });
});

module.exports = bot;

// const TelegramBot = require('node-telegram-bot-api');
// const dotenv = require('dotenv');
// const request = require('request');
// dotenv.config({path: `${__dirname}/config/dev.env`});


// const token = process.env.TELEGRAM;

// const bot = new TelegramBot(token,{polling:true});
// bot.onText(/\/stock(.+)/, (msg,match)=>{
//     let chatId = msg.chat.id;
//     let stock = match[1];
//     request(`https://kams-stocks.herokuapp.com/${stock}`,(error,response,body)=>{
//         if(!error && body){
//             let res = JSON.parse(body);
//             if(res.stockPrice === " "){
//                 bot.sendMessage(chatId,"Stock not found!");
//                 return;
//             }
//             bot.sendMessage(chatId,`The current price in BSE for ${res.stockName} is ${res.stockPrice}`);
//         }
//     });
// });