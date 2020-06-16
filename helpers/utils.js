module.exports = {
  getCommandParameters(text) {
    const splittedText = text.split(/ +/)
    return splittedText.splice(1, splittedText.length)
  },
}
