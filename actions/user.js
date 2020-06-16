const { Composer } = require('telegraf')
const { parseCommandParameters,
        mustHaveParameters } = require('../helpers/middleware')
const {getCommandParameters} = require('../helpers/utils')
const {linkUser, getUserId} = require('../model/index')
const {sendMessage} = require('../helpers/firebase')

var userActions = new Composer()
userActions.command(['start', 'help'], (ctx) => {
  ctx.reply('Mensaje de respuesta')
})

userActions.command('linkUser', parseCommandParameters, mustHaveParameters, (ctx) => {  
  let parameters = getCommandParameters(ctx.update.message.text)
  linkUser(parameters[0], ctx.update.message.from.id).then(e => {
    ctx.deleteMessage(ctx.message.message_id)
    ctx.reply('Usuario conectado correctamente')
  }).catch(e => {
    ctx.tg.deleteMessage(ctx.message.message_id)
    ctx.reply(`Lo siento: ${e}`)
  })
})

userActions.command('getStatus', (ctx) => {
  getUserId(ctx.update.message.from.id).then(user => {
    ctx.deleteMessage(ctx.message.message_id)
    let message = {
      method: "getStatus",
      date: Date.now()
    }
    sendMessage(message, user._id)
  }).catch(e => {
    ctx.tg.deleteMessage(ctx.message.message_id)
    ctx.reply(`Lo siento: ${e}`)
  })
})


module.exports = userActions
