var express = require('express');
var router = express.Router();


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '2061338395:AAFNi402uA9CdkV7rpwejP_vwSyL0NRc5bU';
const bot = new TelegramBot(token, {polling: true});


let global_msg_id;
// Main Menu Bot
bot.onText(/\/start/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /show_url
        click /show_nim
        click /show_matakuliah
        click /show_nilai`
    );
});

bot.onText(/\/show_url/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
            https://esp-telebot.herokuapp.com/api/sensor/123/65/78 \n
            https://esp-telebot.herokuapp.com/api/test/cobacoba
        `
    );
});

bot.onText(/\/show_nim/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
            Nim Kamu : 41421110134 \n
            Kampus : Mercubuana
        `
    );
});

bot.onText(/\/show_nilai/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
            Nilai PBM : B \n
            Nilai PSD : A \n
            Nilai Elektromagnetik : B
        `
    );
});

bot.on('message', (msg) => {
  console.log(msg);
});

bot.onText(/\/show_matakuliah/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
            Mata Kuliah : Perancangan Berbasis Mikroprosessor \n
            Semester : Ganjil 2021/2022
        `
    );
});

bot.on('message', (msg) => {
  console.log(msg);
});


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    "status": 202,
    "messgae": "Success"
  });
});

// https://esp-telebot.herokuapp.com/api/sensor/123/65/78
router.get('/sensor/:sensor1/:sensor2/:sensor3/:sensor4', (req, res, next) => {
  try {
      bot.sendMessage(
            global_msg_id, //msg.id
            `Pembacaan Sensor:: ${req.params.sensor1}, ${req.params.sensor2}, ${req.params.sensor3}, ${req.params.sensor4}`
     );
      res.json({
        "status": 202,
        "messgae": "Success",
        "data": {
          "sensor_1": req.params.sensor1,
          "sensor_2": req.params.sensor2,
          "sensor_3": req.params.sensor3,
           "sensor_3": req.params.sensor4
        }
      });
  } catch (err) {
      next(err);
  }
});

// https://esp-telebot.herokuapp.com/api/test/cobacoba
router.get('/test/:key', function(req, res, next){
    bot.sendMessage(
            global_msg_id, //msg.id
            `${req.params.key}`
    );
    res.json(req.params.key);
});


module.exports = router;
