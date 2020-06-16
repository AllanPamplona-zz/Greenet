const {Telegraf, Composer} = require('telegraf')
require('dotenv').config()
const model = require('./model/')
const amqp = require('./commands/')
const firebase = require('./helpers/firebase')
const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
// Actions

const userAction = require('./actions/user')
firebase.connect()
model.connect().then(() => {
  bot.use(userAction)
  amqp.connection().then(() => {
    var queue = 'notification';
  
    amqp.getChannel().assertQueue(queue, {
      durable: true
    });
  
    amqp.getChannel().consume('notification', function(msg) {
      let event = JSON.parse(msg.content.toString())
      console.log("notification, event")
      model.getChatId(event.user).then((user) => {
        let template = `
        <b>Información sobre tu planta:</b>
        <pre>- Temperatura: ${event.temperatura}</pre>
      `
        if(event.extra){
          template = template + event.extra
        }
        bot.telegram.sendMessage(user.chat_id, template,{parse_mode: 'HTML'})
      })
    }, {
      noAck: true
    });
  }).catch((e) => {
    console.log(e)
  })
  bot.launch()

})
