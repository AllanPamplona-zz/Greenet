var amqp = require('amqplib/callback_api');
var channel;
module.exports = {
  async connection(){
    return new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
          reject(error0);
        }
        connection.createChannel(function(error1, chnl) {
          if (error1) {
            reject(error1);
          }
          resolve()
          channel = chnl
        });
      });
    })
  },
  getChannel(){
    return channel
  },
  getStatus(msg) {
    channel.sendToQueue('request', Buffer.from(msg));
  }
}
function ampqConnect(){

}
 