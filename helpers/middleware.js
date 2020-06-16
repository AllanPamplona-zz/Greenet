const util = require('./utils')

module.exports = {
  mustHaveParameters(ctx, next) {
    ctx.state.command.args.length > 0 ? next() : ctx.reply(`El comando ${ctx.state.command.command} requiere parametros.`)
  },
  parseCommandParameters(ctx, next) {
    if (ctx.updateType === 'message' && ctx.updateSubTypes[0] === 'text') {
      const text = ctx.update.message.text.toLowerCase()
      if (text.startsWith('/')) {
        const match = text.match(/^\/([^\s]+)\s?(.+)?/)
        let args = []
        let command
        if (match !== null) {
          if (match[1]) {
            command = match[1]
          }
          if (match[2]) {
            args = match[2].split(' ')
          }
        }
        ctx.state.command = {
          raw: text,
          command,
          args
        }
      }
    }
    return next()
  }
}
