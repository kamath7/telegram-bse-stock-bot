const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const request = require('request');
dotenv.config({path: `${__dirname}/config/dev.env`});


const token = process.env.TELEGRAM;

const bot = new TelegramBot(token,{polling:true});
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